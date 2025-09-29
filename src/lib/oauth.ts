// src/lib/server/oauth.js
// Reference: https://appwrite.io/docs/tutorials/nextjs-ssr-auth/step-7
"use server";

import { createAdminClient } from "@/lib/appwrite";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";
import { GITHUB_REDIRECT_URL, GOGGLE_REDIRECT_URL } from "./config";

export async function signUpWithGithub() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");

  console.log("the origin" , origin);

  const redirectUrl = await account.createOAuth2Token({
    provider : OAuthProvider.Github,
    success : GITHUB_REDIRECT_URL,
    failure : `${origin}/sign-up`
  });

  return redirect(redirectUrl);
}

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");

  console.log("the origin" , origin);

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    GOGGLE_REDIRECT_URL,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
}
