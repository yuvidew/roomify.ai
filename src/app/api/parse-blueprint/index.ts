
import { ai } from "@/lib/ai";
import { Type, createUserContent, createPartFromUri } from "@google/genai";
import { Room } from "@/types/type";

export interface FloorPlanAnalysis {
    rooms: Room[];
    title : string
}

export const analyzeFloorPlan = async (
    file: File
): Promise<FloorPlanAnalysis> => {

    const uploaded = await ai.files.upload({
        file,
        config: { mimeType: file.type || "image/png" },
    });



    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: createUserContent([
            createPartFromUri(uploaded.uri!, uploaded.mimeType!),
            `You are an architect's assistant. Given a floor plan image, extract a structured list of spaces and generate a comprehensive title for the entire analysis.

            FIRST, generate a title for the whole extract that includes:
            - Property type (e.g., "2-Bedroom Apartment", "Single Family Home", "Office Suite")
            - Total approximate square footage if determinable
            - Any distinctive features (e.g., "with Balcony", "Corner Unit", "Split Level")

            THEN, for each space, provide the following fields:
            - name (string) - specific room identifier
            - type (enum: bedroom, kitchen, hall, living, dining, bathroom, balcony, storage, other)
            - approxAreaSqFt (number, estimate conservatively if not provided)
            - dimensions (string) - IMPORTANT: Extract or estimate room dimensions in format "length x width ft" (e.g., "12 x 10 ft", "8 x 6 ft"). If no measurements are visible:
              * For bedrooms: estimate 10-15 ft per side
              * For bathrooms: estimate 5-8 ft per side  
              * For kitchens: estimate 8-12 ft per side
              * For living rooms: estimate 12-20 ft per side
              * Scale relative to other rooms in the plan
              * NEVER use "Unclear" - always provide an estimated dimension
            - notes (string, any relevant observations)
            - labels (string, any text or labels present in the image)

            Format the output as structured data with the title at the top, followed by the room list.

            Ensure the output is clean, consistent, and professionally formatted. If information is missing, infer it reasonably and document assumptions in the notes field.

            Example output format:
            TITLE: "3-Bedroom Apartment Floor Plan - Approximately 1,200 sq ft with Balcony"

            ROOMS:
            [structured room data follows...]`
        ]),

        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { 
                        type: Type.STRING, 
                        description: "Descriptive title for the entire floor plan"
                    },
                    rooms: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                type: {
                                    type: Type.STRING, enum: [
                                        "bedroom", "kitchen", "hall", "living", "dining",
                                        "bathroom", "balcony", "storage", "other"
                                    ]
                                },
                                approxAreaSqFt: { type: Type.NUMBER },
                                dimensions: { type: Type.STRING },
                                notes: { type: Type.STRING },
                            },
                            propertyOrdering: ["name", "type", "approxAreaSqFt", "dimensions", "notes"],
                        },
                    },
                },
                propertyOrdering: ["title","rooms"],
            },
        },
    });

    return JSON.parse(response.text!);
}