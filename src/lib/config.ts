export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
export const PROJECT_NAME = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME!;
export const EXTRACT_ROOMS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_EXTRACT_ROOMS_TABLE_ID!;
export const AI_EXTRACT_ROOMS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_AI_EXTRACT_ROOMS_TABLE_ID!;
export const APPWRITER_KEY = process.env.NEXT_APPWRITE_KEY!;
export const AI_GENERATED_ROOMS_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_AI_GENERATED_ROOMS_TABLE_ID!;

// Provide a robust default for Appwrite Cloud and normalize region subdomains
const normalizeEndpoint = (raw?: string) => {
  const fallback = "https://cloud.appwrite.io/v1";
  if (!raw) return fallback;
  try {
    const url = new URL(raw);
    if (url.hostname.endsWith(".cloud.appwrite.io")) {
      url.hostname = "cloud.appwrite.io";
      return url.toString();
    }
    return url.toString();
  } catch {
    return raw || fallback;
  }
};

export const ENDPOINT = normalizeEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!);
