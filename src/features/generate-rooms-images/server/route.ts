
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { google } from "@ai-sdk/google";
import { generateText } from 'ai';
import { AI_GENERATED_ROOMS_TABLE_ID, DATABASE_ID } from "@/lib/config";
import { ID, Query } from "node-appwrite";
import { GenerateImagesSchema } from "../schema";

function buildCombinedPrompt(rooms: string, prompt: string): string {
    return `Create both written descriptions AND visual renderings for each room in this architectural floor plan.

    For each room, provide:
    1. A written description starting with "<ROOM NAME> — ~<AREA> sqft"
    2. A photorealistic interior rendering image
    3. First identify the room type (e.g., bedroom, bathroom, kitchen, living room, dining room, office, closet, etc.)

    FLOOR PLAN DATA:${rooms}

    Style: ${prompt}`;
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

                if (!rooms ) {
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
                        message: "Failed to generate images"
                    })
                }

                const images = result.files?.filter(file =>
                    file.mediaType.startsWith('image/')
                ) || [];


                if (!images && !result.text) {
                    return c.json({
                        message: "Failed to generate images"
                    })
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
                                mediaType: image.mediaType,
                                save: false
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

        const generated_rooms_images = await database.listDocuments(
            DATABASE_ID,
            AI_GENERATED_ROOMS_TABLE_ID,
            [Query.equal("extract_room_id", extract_room_id)]
        );

        return c.json({
            total: generated_rooms_images.total,
            documents: generated_rooms_images.documents,
        });
    });

export default app;
