import z from "zod";

// Accepts `rooms` as a JSON string (from form data) or as an already-parsed array.
export const GenerateImagesSchema = z.object({
    extract_room_id: z
        .string()
        .min(5, { message: "Extract room id is required!" }),
    prompt: z.string().min(5, { message: "Custom prompt is required" }),
    rooms: z.string()
});
