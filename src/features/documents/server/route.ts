import { AI_EXTRACT_ROOMS_TABLE_ID, AI_GENERATED_ROOMS_TABLE_ID, DATABASE_ID, EXTRACT_ROOMS_TABLE_ID } from "@/lib/config";
import { sessionMiddleware, type AdditionalContext } from "@/lib/session-middleware";
import { Hono } from "hono";
import { Query } from "node-appwrite";

const app = new Hono<AdditionalContext>()
    .get("/get-rooms-all-list", 
        sessionMiddleware, 
        async (c) => {
            const user = c.get("user");
            const database = c.get("databases");
            if (!user) {
                return c.json({ message: "User id is required!" }, 401);
            }
            // Get this user's extract_room ids
            const extracts = await database.listDocuments(
                DATABASE_ID,
                EXTRACT_ROOMS_TABLE_ID,
                [Query.equal("user_id", user.$id)]
            );

            if (!extracts) {
                return c.json({
                    message : "Failed to get rooms data "
                }) 
            }

            // const extractIds = extracts.documents.map((d) => d.$id);
            // if (extractIds.length === 0) {
            //     return c.json({ total: 0, documents: [] });
            // }
            // const extractedRooms = await database.listDocuments(
            //     DATABASE_ID,
            //     AI_EXTRACT_ROOMS_TABLE_ID,
            //     [Query.equal("extract_room_id", extractIds)]
            // );

            // const retry = async <T>(fn: () => Promise<T>, attempts = 3, base = 250): Promise<T> => {
            //     let lastErr: unknown;
            //     for (let i = 0; i < attempts; i++) {
            //         try {
            //             return await fn();
            //         } catch (err) {
            //             lastErr = err;
            //             const delay = base * Math.pow(2, i) + Math.floor(Math.random() * 100);
            //             await new Promise((r) => setTimeout(r, delay));
            //         }
            //     }
            //     throw lastErr;
            // };
            
            // const generatedRooms = await retry(() => database.listDocuments(
            //     DATABASE_ID,
            //     AI_GENERATED_ROOMS_TABLE_ID,
            //     [Query.equal("extract_room_id", extractIds)]
            // ));

            // const mappedDocument = extracts.documents.map(((document) => ({
            //     ...document,
            //     generated_rooms_images : generatedRooms.documents.filter((generatedRoom) => generatedRoom.extract_room_id === document.$id),
            //     extracted_rooms : extractedRooms.documents.filter((extractedRoom) => extractedRoom.extract_room_id === document.$id)
            // })))

            return c.json({
                total: extracts.total,
                documents: extracts.documents,
            });
        }
    )
    .get(
        "/home-details/:id", 
        sessionMiddleware, 
        async (c) => {
            const database = c.get("databases");
            const {id} = c.req.param();

            if (!id) {
                return c.json({
                    message : "Id is required to get home  details"
                })
            }

            const {total , documents} = await database.listDocuments(
                DATABASE_ID,
                EXTRACT_ROOMS_TABLE_ID,
                [Query.equal("$id", id)]
            );

            return c.json( {
                total,
                documents
            })
        }
    )
    .get(
        "/extracted-rooms/:id",
        sessionMiddleware,
        async (c) => {
            const database = c.get("databases");
            const {id} = c.req.param();

            if (!id) {
                return c.json({
                    message : "Id is required to get Extracted details"
                })
            }

            const {total , documents} = await database.listDocuments(
                DATABASE_ID,
                AI_EXTRACT_ROOMS_TABLE_ID,
                [Query.equal("extract_room_id", id)]
            );

            c.json( {
                total,
                documents
            })
        }
    )
    .get(
        "/generated-rooms-images/:id",
        sessionMiddleware,
        async (c) => {
            const database = c.get("databases");
            const {id} = c.req.param();

            if (!id) {
                return c.json({
                    message : "Id is required to get Extracted details"
                })
            }

            const {total , documents} = await database.listDocuments(
                DATABASE_ID,
                AI_GENERATED_ROOMS_TABLE_ID,
                [Query.equal("extract_room_id", id)]
            );

            c.json( {
                total,
                documents
            })
        }
    )

export default app;
