
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { google } from "@ai-sdk/google";
import { generateText } from 'ai';
import { AI_GENERATED_ROOMS_TABLE_ID, DATABASE_ID, EXTRACT_ROOMS_TABLE_ID } from "@/lib/config";
import { ID, Query } from "node-appwrite";
import { GenerateImagesSchema } from "../schema";

function buildCombinedPrompt(rooms: string, prompt: string): string {

    // return `Create both written descriptions AND visual renderings for each room in this architectural floor plan.
    
    // For each room, provide:
    // 1. A markdown-formatted written description following this structure:
    //     - Start with "## <ROOM NAME> — ~<AREA> sqft\\n"
    //     - Include "### Room Type\\n[room type]\\n\\n"
    //     - Add "### Description\\n[detailed description]\\n\\n" 
    //     - End with "### Key Features\\n- [feature 1]\\n- [feature 2]\\n- [feature 3]\\n\\n"
    // 2. A photorealistic interior rendering image
    // 3. First identify the room type (e.g., bedroom, bathroom, kitchen, living room, dining room, office, closet, etc.)
    
    // Format the written descriptions as markdown text with proper escaping (use \\\\n for line breaks).
    
    // Example format:
    // "## Master Bedroom — ~180 sqft\\n\\n### Room Type\\nBedroom\\n\\n### Description\\nA spacious master bedroom featuring...\\n\\n### Key Features\\n- Large windows for natural light\\n- Built-in closet space\\n- Hardwood flooring\\n\\n"
    
    // FLOOR PLAN DATA: ${rooms}
    // Style: ${prompt}`;

    return `You are an expert interior designer and architectural visualizer. Create comprehensive room analyses for each space in this floor plan.

TASK: For each room identified in the floor plan data, provide:

1. **Written Description** (markdown format):
   - Header: ## [Room Name] — ~[Area] sqft
   - Room Type: ### Room Type\n[specific room category]
   - Description: ### Description\n[detailed 2-3 sentence description of the space, layout, and primary functions]
   - Key Features: ### Key Features\n- [feature 1]\n- [feature 2]\n- [feature 3]

2. **Visual Requirements**: 
   - Generate a photorealistic interior rendering
   - Show the room from an appealing angle
   - Include appropriate furniture and decor
   - Ensure lighting matches the room's natural light sources
   - Style should reflect: ${prompt}

GUIDELINES:
- First, analyze the floor plan to identify all distinct rooms
- Determine realistic square footage based on proportions
- Choose appropriate room types (bedroom, bathroom, kitchen, living room, dining room, office, closet, laundry, etc.)
- Descriptions should be specific and practical
- Features should be relevant to the room type and realistic for the space
- Use proper markdown formatting with escaped line breaks (\\n)

FLOOR PLAN DATA:
${rooms}

STYLE PREFERENCE: ${prompt}

OUTPUT FORMAT:
Provide each room as a complete package with both written description and visual rendering. Ensure consistency between the written description and the generated image.`;
}

const app = new Hono()
    .post(
        "/",
        zValidator("form", GenerateImagesSchema),
        sessionMiddleware,
        async (c) => {
            try {
                const database = c.get("databases");
                const { rooms, extract_room_id, prompt } = c.req.valid("form");


                if (!extract_room_id) {
                    return c.json({ message: "Extract room id is required" });
                }

                if (!rooms) {
                    return c.json({ message: "Rooms is required" });
                }

                const result = await generateText({
                    model: google('gemini-2.0-flash-exp'),
                    providerOptions: {
                        google: {
                            responseModalities: ['TEXT', 'IMAGE']
                        }
                    },
                    prompt: buildCombinedPrompt(rooms, prompt || "Modern, minimal, simple interiors with realistic lighting and proper proportions."),
                });


                if (!result) {
                    return c.json({
                        message: "Failed to generate image result"
                    }, 403)
                }

                const images = result.files?.filter(file =>
                    file.mediaType.startsWith('image/')
                ) || [];


                if (!images && !result.text) {
                    return c.json({
                        message: "Failed to generate images"
                    }, 403)
                }


                try {
                    if (images.length > 0) {
                        const createPromises = images.map((image) =>
                            database.createDocument(
                                DATABASE_ID,
                                AI_GENERATED_ROOMS_TABLE_ID,
                                ID.unique(),
                                {
                                    extract_room_id,
                                    // text: result.text,
                                    image_base64: image.base64,
                                    mediaType: image.mediaType,
                                }
                            )
                        );

                        await Promise.all(createPromises);

                        await database.updateDocument(
                            DATABASE_ID,
                            EXTRACT_ROOMS_TABLE_ID,
                            extract_room_id,
                            { home_description: result.text }
                        );
                    }
                } catch (error) {
                    console.error("Error while saving generated images or updating document:", error instanceof Error ? error?.message : error);
                    throw new Error(
                        `Failed to save generated images or update document for extract_room_id: ${extract_room_id}. 
        Reason: ${error instanceof Error ? error?.message : "Unknown error"}`
                    );
                }



                return c.json({
                    extract_room_id
                })
            } catch (error) {
                console.log("image Generate Error", error);

                return c.json({
                    message: "failed to generate image"
                })
            }
        }
    )
    .get("/:extract_room_id", sessionMiddleware, async (c) => {
        const database = c.get("databases");
        const { extract_room_id } = c.req.param();


        if (!extract_room_id) {
            return c.json({
                message: "Extract_room_id is required",
            });
        }

        // Basic retry helper for transient 503s from upstream (e.g., first byte timeout)
        const retry = async <T>(fn: () => Promise<T>, attempts = 3, base = 250): Promise<T> => {
            let lastErr: unknown;
            for (let i = 0; i < attempts; i++) {
                try {
                    return await fn();
                } catch (err) {
                    lastErr = err;
                    // small exponential backoff with jitter
                    const delay = base * Math.pow(2, i) + Math.floor(Math.random() * 100);
                    await new Promise((r) => setTimeout(r, delay));
                }
            }
            throw lastErr;
        };

        try {
            const generated_rooms_images = await retry(() =>
                database.listDocuments(
                    DATABASE_ID,
                    AI_GENERATED_ROOMS_TABLE_ID,
                    [
                        Query.equal("extract_room_id", extract_room_id),
                        Query.orderDesc("$createdAt"),
                        Query.limit(50),
                    ]
                )
            );

            return c.json({
                total: generated_rooms_images.total,
                documents: generated_rooms_images.documents,
            });
        } catch (error) {
            console.error("listDocuments failed", error);
            return c.json(
                {
                    error: "Failed to fetch generated room images",
                },
                503
            );
        }
    })
    .delete("/delete/:id", sessionMiddleware , async (c) => {
        const database = c.get("databases");
        const {id} = c.req.param();

        if (!id) {
            return c.json({
                message: "Image id is required",
            });
        }

        try {
            await database.deleteDocument(
                DATABASE_ID,
                AI_GENERATED_ROOMS_TABLE_ID,
                id
            )

            return c.json({
                message: "Room image deleted successfully",
                status: "success",
                id,
            }); 
        } catch (error) {
            return c.json({
                message: "Failed to delete room image",
                status: "success",
                id,
            }); 
        }
    });

export default app;
