// import { NextResponse } from "next/server";
// import { ai } from "@/lib/ai";
// import type { Part } from "@google/genai";

// export const runtime = "nodejs";

// type Room = {
//     name: string;
//     type: string;
//     approxAreaSqFt?: number;
//     dimensions?: string;
//     notes?: string;
// };

// export async function POST(req: Request) {
//     console.log("the generate image - 1", );
//     try {
//         const { rooms, style } = (await req.json()) as {
//             rooms: Room[];
//             style?: string;
//         };


//         const tasks = rooms.map(async (room) => {
//             try {
//                 const prompt = [
//                     `Photorealistic interior render of a ${room.type} named "${room.name}".`,
//                     room.dimensions ? `Dimensions: ${room.dimensions}.` : "",
//                     room.approxAreaSqFt
//                         ? `Approx area: ${room.approxAreaSqFt} sq ft.`
//                         : "",
//                     room.notes ? `Notes from plan: ${room.notes}.` : "",
//                     style
//                         ? `Overall style: ${style}.`
//                         : "Modern, bright, Indian apartment aesthetic.",
//                     "Ultra-detailed materials, realistic lighting, global illumination, 24-35mm lens, 4K feel.",
//                     "Show only the room interior, camera at eye level, balanced composition.",
//                 ].join(" ");

//                 console.log("Prompt for", room.name, ":", prompt);

//                 const res = await ai.models.generateContent({
//                     model: "gemini-2.5-flash-image-preview",
//                     // model: "imagen-3.0-generate-002",
//                     contents: prompt,
//                 });

//                 // Log the raw response (careful, can be big)
//                 console.log("Raw response:", JSON.stringify(res, null, 2));

//                 const part = res.candidates?.[0]?.content?.parts?.find(
//                     (p: Part) => "inlineData" in p
//                 ) as { inlineData: { data: string; mimeType: string } } | undefined;

//                 if (!part?.inlineData?.data) {
//                     console.error("No inlineData found for", room.name);
//                 }

//                 console.log(part?.inlineData?.data);

//                 return {
//                     room: room.name,
//                     imageBase64: part?.inlineData?.data
//                         ? `data:image/png;base64,${part.inlineData.data}`
//                         : null,
//                 };
//             } catch (roomErr) {
//                 console.error("Error generating image for room:", room.name, roomErr);
//                 return { room: room.name, imageBase64: null };
//             }
//         });

//         const images = await Promise.all(tasks);
//         return NextResponse.json({ images });
//     } catch (err) {
//         console.error("Unexpected error in generate-images route:", err);
//         return NextResponse.json(
//             { error: "Failed to generate images" },
//             { status: 500 }
//         );
//     }
// }

import { NextResponse } from "next/server";
import { ai } from "@/lib/ai";
import type { Part } from "@google/genai";

export const runtime = "nodejs";

type Room = {
    name: string;
    type: string;
    approxAreaSqFt?: number;
    dimensions?: string;
    notes?: string;
};

type GenOk = { room: string; imageBase64: string | null };
type GenErr = { room: string; error: string };

const MODEL_ID = "gemini-2.0-flash-exp"; // or "imagen-3.0-generate-002"
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 3000; // base delay between sequential calls
const JITTER_MS = 400; // random +/- jitter to avoid thundering herd

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

// Extract Retry-After (seconds) from Google ApiError payload if present
function getRetryDelayFromError(e: unknown): number | null {
    try {
        const err = e as any;
        const raw = err?.message ?? "";
        // Sometimes the SDK attaches the JSON in err.message, sometimes on err
        const parsed =
            typeof err === "object" && err?.error
                ? err.error
                : JSON.parse(raw)?.error;

        const details = parsed?.details;
        if (Array.isArray(details)) {
            const retry = details.find(
                (d: any) =>
                    typeof d === "object" &&
                    d["@type"]?.toString().includes("google.rpc.RetryInfo")
            );
            if (retry?.retryDelay) {
                // retryDelay like "30s" or "1.5s"
                const m = /^([\d.]+)s$/.exec(retry.retryDelay);
                if (m) return Math.ceil(Number(m[1]) * 1000);
            }
        }
    } catch {
        // fall through to null
    }
    return null;
}

function buildPrompt(room: Room, style?: string) {
    return [
        `Photorealistic interior render of a ${room.type} named "${room.name}".`,
        room.dimensions ? `Dimensions: ${room.dimensions}.` : "",
        room.approxAreaSqFt ? `Approx area: ${room.approxAreaSqFt} sq ft.` : "",
        room.notes ? `Notes from plan: ${room.notes}.` : "",
        style ? `Overall style: ${style}.` : "Modern, bright, Indian apartment aesthetic.",
        "Ultra-detailed materials, realistic lighting, global illumination, 24-35mm lens, 4K feel.",
        "Show only the room interior, camera at eye level, balanced composition.",
    ].join(" ");
}

async function generateRoomImage(room: Room, style?: string): Promise<GenOk | GenErr> {
    let attempt = 0;
    const prompt = buildPrompt(room, style);

    while (attempt <= MAX_RETRIES) {
        try {
            console.log(`[gen] ${room.name} attempt ${attempt + 1}:`, prompt);

            const res = await ai.models.generateContent({
                model: MODEL_ID,
                contents: prompt,
            });

            const part = res.candidates?.[0]?.content?.parts?.find(
                (p: Part) => "inlineData" in p
            ) as { inlineData: { data: string; mimeType: string } } | undefined;

            if (!part?.inlineData?.data) {
                const msg = "No image returned (inlineData missing).";
                console.error(`[gen] ${room.name}: ${msg}`);
                return { room: room.name, imageBase64: null };
            }

            const imageBase64 = `data:${part.inlineData.mimeType || "image/png"};base64,${part.inlineData.data}`;
            return { room: room.name, imageBase64 };
        } catch (e) {
            attempt++;
            const status = (e as any)?.status ?? (e as any)?.code;
            const msg = (e as any)?.message || String(e);
            console.error(`[gen] ${room.name} error (attempt ${attempt}):`, msg);

            // Retry on 429 or explicit RESOURCE_EXHAUSTED
            const isQuota =
                status === 429 ||
                (typeof msg === "string" && msg.includes("RESOURCE_EXHAUSTED"));

            if (isQuota && attempt <= MAX_RETRIES) {
                // Prefer server-provided retry delay; else exponential backoff
                const retryFromErr = getRetryDelayFromError(e);
                const backoff =
                    retryFromErr ??
                    Math.min(30000, BASE_DELAY_MS * Math.pow(2, attempt - 1)); // cap at 30s
                const jitter =
                    Math.floor(Math.random() * (2 * JITTER_MS + 1)) - JITTER_MS;

                const waitMs = Math.max(0, backoff + jitter);
                console.warn(
                    `[gen] ${room.name} quota hit. Retrying in ${waitMs}ms (attempt ${attempt}/${MAX_RETRIES})`
                );
                await sleep(waitMs);
                continue;
            }

            // Non-retryable or out of retries
            return { room: room.name, error: msg };
        }
    }

    return { room: room.name, error: "Exceeded retry attempts." };
}

export async function POST(req: Request) {
    console.log("the generate image - 1");
    try {
        const { rooms, style } = (await req.json()) as {
            rooms: Room[];
            style?: string;
        };

        if (!Array.isArray(rooms) || rooms.length === 0) {
            return NextResponse.json({ images: [], errors: ["No rooms provided."] }, { status: 400 });
        }

        const images: GenOk[] = [];
        const errors: GenErr[] = [];

        // SEQUENTIAL processing to avoid RPM spikes
        for (const room of rooms) {
            const result = await generateRoomImage(room, style);
            if ("imageBase64" in result) {
                images.push(result);
            } else {
                errors.push(result);
            }

            // small base delay between rooms to spread requests (even on success)
            await sleep(BASE_DELAY_MS + Math.floor(Math.random() * JITTER_MS));
        }

        return NextResponse.json({ images, errors });
    } catch (err) {
        console.error("Unexpected error in generate-images route:", err);
        return NextResponse.json(
            { error: "Failed to generate images" },
            { status: 500 }
        );
    }
}
