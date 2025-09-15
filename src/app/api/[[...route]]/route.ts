import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route"
import extract_room from "@/features/extract-rooms/server/route"
import generate_rooms_images from "@/features/generate-rooms-images/server/route"


const app = new Hono().basePath("/api");


const routes = app
    .route("/authentication" , auth)
    .route("/extract_rooms" , extract_room)
    .route("/generate_rooms_images",generate_rooms_images)


export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
