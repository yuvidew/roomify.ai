
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
    // const form = await req.formData();
    // const file = form.get("blueprint") as File;

    const uploaded = await ai.files.upload({
        file,
        config: { mimeType: file.type || "image/png" },
    });



    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: createUserContent([
            createPartFromUri(uploaded.uri!, uploaded.mimeType!),
            `You are an architect's assistant.  
Given a floor plan image, extract a structured list of spaces.  

For each space, provide the following fields:  
- name (string)  
- type (enum: bedroom, kitchen, hall, living, dining, bathroom, balcony, storage, other)  
- approxAreaSqFt (number, estimate conservatively if not provided)  
- dimensions (string, e.g., "10x12 ft")  
- notes (string, any relevant observations)  
- labels (string, any text or labels present in the image)  

Ensure the output is clean, consistent, and formatted as structured data.  
If information is missing, infer it reasonably and document assumptions in the notes field.`,
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