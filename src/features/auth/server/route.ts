import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { loginSchema, registerSchema } from "../schemas";

import { AUTH_COOKIE } from "../constants";

import { createAdminClient } from "@/lib/appwrite";

import { ID } from "node-appwrite";

import { sessionMiddleware } from "@/lib/session-middleware";
import { deleteCookie, setCookie } from "hono/cookie";

const app = new Hono()
    .get("/current", sessionMiddleware, (c) => {
        const user = c.get("user");

        return c.json({ data: user })
    })
    .post("/signin", zValidator("json", loginSchema), async (c) => {
        console.log("sign in api is calling");
        // const account = c.get("account")
        const { email, password } = c.req.valid("json");
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ success: true });
    })
    .post("/signup", zValidator("json", registerSchema), async (c) => {
        console.log("sign up api is calling");
        const { name, email, password } = c.req.valid("json");

        const { account } = await createAdminClient();
        await account.create(ID.unique(), email, password, name);

        const session = await account.createEmailPasswordSession(email, password);

        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({ success: true });
    })
    .post("/logout" , sessionMiddleware , async(c) => {
        const account = c.get("account");

        deleteCookie(c, AUTH_COOKIE);

        await account.deleteSession("current");

        return c.json({ success: true });
    })

export default app    