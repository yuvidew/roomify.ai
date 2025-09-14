import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { create_extract_rooms_schema, GenerateImagesSchema } from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { analyzeFloorPlan, FloorPlanAnalysis } from "@/app/api/parse-blueprint";
import {
    AI_EXTRACT_ROOMS_TABLE_ID,
    AI_GENERATED_ROOMS_TABLE_ID,
    BUCKET_ID,
    DATABASE_ID,
    EXTRACT_ROOMS_TABLE_ID,
} from "@/lib/config";
import { Room } from "@/types/type";

import { google } from "@ai-sdk/google";
import { generateText } from 'ai';


function buildCombinedPrompt(rooms: Room[], prompt: string): string {
    return `Create both written descriptions AND visual renderings for each room in this architectural floor plan.

For each room, provide:
1. A written description starting with "<ROOM NAME> — ~<AREA> sqft"
2. A photorealistic interior rendering image

FLOOR PLAN DATA:${JSON.stringify(rooms)}

Style: ${prompt}`;
}

const app = new Hono()
    .post(
        "/upload_blueprint",
        zValidator("form", create_extract_rooms_schema),
        sessionMiddleware,
        async (c) => {
            const user = c.get("user");
            const database = c.get("databases");
            const storage = c.get("storage");

            const { blueprint: image } = c.req.valid("form");

            let uploadedImageUrl: string | undefined;

            let roomsAnalysis: FloorPlanAnalysis | undefined;

            if (image && image instanceof File) {
                const imageUpload = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    image
                );
                const arrayBuffer = await storage.getFileDownload(
                    BUCKET_ID,
                    imageUpload.$id
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(
                    arrayBuffer
                ).toString("base64")}`;

                try {
                    roomsAnalysis = await analyzeFloorPlan(image);
                } catch (aiError) {
                    return c.json(
                        {
                            error: "Failed to analyze floor plan",
                            details:
                                aiError instanceof Error ? aiError.message : "Unknown error",
                        },
                        500
                    );
                }
            }

            if (!roomsAnalysis || !uploadedImageUrl) {
                return c.json(
                    {
                        error: "Processing failed",
                        message: "Could not process the blueprint image",
                    },
                    500
                );
            }

            if (!user) {
                return c.json({
                    message: "User id is required!",
                });
            }

            const extract_rooms = await database.createDocument(
                DATABASE_ID,
                EXTRACT_ROOMS_TABLE_ID,
                ID.unique(),
                {
                    img_url: uploadedImageUrl!,
                    img_name: "",
                    home_title: roomsAnalysis?.title,
                    user_id: user.$id,
                }
            );

            if (roomsAnalysis?.rooms && roomsAnalysis.rooms.length > 0) {
                const createPromises = roomsAnalysis.rooms.map((room) =>
                    database.createDocument(
                        DATABASE_ID,
                        AI_EXTRACT_ROOMS_TABLE_ID,
                        ID.unique(),
                        {
                            name: room.name,
                            type: room.type,
                            approxAreaSqFt: String(room.approxAreaSqFt),
                            dimensions: room.dimensions,
                            notes: room.notes,
                            extract_room_id: extract_rooms.$id,
                        }
                    )
                );
                await Promise.all(createPromises);
            }

            return c.json({
                extract_rooms,
            });
        }
    )
    .post(
        "/generate_images",
        zValidator("form", GenerateImagesSchema),
        sessionMiddleware,
        async (c) => {
            try {

                const database = c.get("databases");
                const { rooms, extract_room_id, prompt } = c.req.valid("form");

                if (!extract_room_id) {
                    return c.json({ message: "Extract room id is required" });
                }

                if (!rooms || !Array.isArray(rooms)) {
                    return c.json({ message: "Rooms array is required" });
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



                const images = result.files?.filter(file =>
                    file.mediaType.startsWith('image/')
                ) || [];

                

                if (!images && !result.text) {
                    return c.json({
                        message: "Failed to generate images"
                    },502)
                }

                if (images.length > 0) {
                    const createPromises = images.map((image) =>
                        database.createDocument(
                            DATABASE_ID,
                            AI_GENERATED_ROOMS_TABLE_ID,
                            ID.unique(),
                            {
                                extract_room_id,
                                text: result.text,
                                image_base64: image.base64,
                                mediaType: image.mediaType
                            }
                        )
                    )

                    await Promise.all(createPromises);
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

        const extracted_rooms = await database.listDocuments(
            DATABASE_ID,
            AI_EXTRACT_ROOMS_TABLE_ID,
            [Query.equal("extract_room_id", extract_room_id)]
        );

        return c.json({
            total: extracted_rooms.total,
            documents: extracted_rooms.documents,
        });
    });

export default app;
