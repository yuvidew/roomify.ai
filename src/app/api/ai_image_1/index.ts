import { Room } from "@/types/type";
import { google } from "@ai-sdk/google";
import { generateText } from 'ai';

type GenerateRoomResult = {
    text: string;
    images: Array<{
        base64: string;
        mediaType: string;
    }>;
}

const buildCombinedPrompt = (rooms: Room[]): string => {
    return `Create both written descriptions AND visual renderings for each room in this architectural floor plan.

    For each room, provide:
    1. A written description starting with "<ROOM NAME> — ~<AREA> sqft"
    2. A photorealistic interior rendering image

    FLOOR PLAN DATA: ${rooms}


    Style: Modern, minimal, simple interiors with realistic lighting and proper proportions.`;
}



export const GenerateImages = async (rooms: Room[] , prompt : string): Promise<GenerateRoomResult> => {

    try {

        if (!rooms || !Array.isArray(rooms)) {
            throw new Error("Rooms array is required");
        }

        const result = await generateText({
            model: google('gemini-2.0-flash-exp'),
            providerOptions: {
                google: {
                    responseModalities: ['TEXT', 'IMAGE']
                }
            },
            prompt: buildCombinedPrompt(rooms),
        });

        const images = result.files?.filter(file =>
            file.mediaType.startsWith('image/')
        ) || [];

        return {
            text: result.text,
            images: images.map(image => ({
                base64: image.base64,
                mediaType: image.mediaType
            })),
        }
    } catch (error) {
        throw new Error(`Failed to generate room content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

}