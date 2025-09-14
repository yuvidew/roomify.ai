import z from "zod";

export const create_extract_rooms_schema = z.object({
    blueprint: z.union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
    ])
        .optional()
});

export const GenerateImagesSchema = z.object({
    extract_room_id: z
        .string()
        .min(5, { message: "Extract room id is required!" }),
    prompt : z.string().min(5 , {message : "Custom prompt is required"}),
    rooms: z
        .string()
        .transform((value, ctx) => {
            try {
                return JSON.parse(value as unknown as string);
            } catch {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid rooms payload" });
                return z.NEVER;
            }
        })
        .pipe(
            z.array(
                z.object({
                    name: z.string(),
                    type: z.string(),
                    approxAreaSqFt: z.string(),
                    dimensions: z.string().optional(),
                    notes: z.string(),
                })
            )
        ),
});
