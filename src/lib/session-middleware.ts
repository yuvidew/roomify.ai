import "server-only";

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { ENDPOINT, PROJECT_ID } from "@/lib/config";

export type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {

    const client = new Client()
      .setEndpoint(ENDPOINT)
      .setProject(PROJECT_ID);

    const session = getCookie(c, AUTH_COOKIE);


    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    let user: Models.User<Models.Preferences>;
    try {
      user = await account.get();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      // Network/DNS issues should surface as a 503 to help debugging
      if (message.includes("fetch failed") || message.includes("ENOTFOUND")) {
        return c.json(
          {
            error: "Appwrite endpoint unreachable",
            hint: "Check NEXT_PUBLIC_APPWRITE_ENDPOINT and network connectivity",
          },
          503
        );
      }
      // Fall back to unauthorized for other account.get() errors
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  }
);
