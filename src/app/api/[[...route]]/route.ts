import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route"

const app = new Hono().basePath("/api");



const routes = app
    .route("/authentication" , auth)


export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
