import z from "zod";

export const create_extract_rooms_schema = z.object({
    blueprint: z.union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
    ])
        .optional()
});


