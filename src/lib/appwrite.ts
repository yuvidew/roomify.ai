import "server-only";

import { Client, Account, Users, Databases } from "node-appwrite";
import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/features/auth/constants";
import { ENDPOINT, PROJECT_ID, APPWRITER_KEY } from "@/lib/config";

export const createSessionClient = async () => {
    const client = new Client()
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID);

    const session = await (await cookies()).get(AUTH_COOKIE);

    if (!session || !session.value) {
        throw new Error("Unauthorized");
    }

    client.setSession(session.value);


    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };

}

export const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT_ID)
        .setKey(APPWRITER_KEY);

    return {
        get account() {
            return new Account(client);
        },
        get users() {
            return new Users(client);
        },
    };
}
