import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from 'ai';

// This approach uses Gemini 2.0's multi-modal capabilities
// Set GOOGLE_GENERATIVE_AI_API_KEY in your .env.local

type ROOMS = {
  name: string,
  type: string,
  approxAreaSqFt: number,
  dimensions: string,
  notes: string
}

// helper: build a nice descriptive prompt from your JSON data


// Generate a single room prompt for image generation
function buildCombinedPrompt(rooms: ROOMS[]): string {
  return `Create both written descriptions AND visual renderings for each room in this architectural floor plan.

For each room, provide:
1. A written description starting with "<ROOM NAME> — ~<AREA> sqft"
2. A photorealistic interior rendering image

FLOOR PLAN DATA: ${rooms}


Style: Modern, minimal, simple interiors with realistic lighting and proper proportions.`;
}
export async function POST(req: NextRequest) {
  console.log("calling ai image generate api");
  try {
    const body = await req.json();

    console.log("the body data " , body);
    // Explicitly type cast
    const rooms = body as ROOMS[];
    console.log(rooms);
    const roomIndex: number = body.roomIndex ?? 0;
    if (!rooms || !Array.isArray(rooms)) {
      return NextResponse.json({ error: "Rooms array is required" }, { status: 400 });
    }

    // Use custom prompt if provided, otherwise generate for specific room
    let finalPrompt: string;
    if (roomIndex >= 0 && roomIndex < rooms.length) {
      finalPrompt = buildCombinedPrompt(rooms);
    } else {
      return NextResponse.json({ error: "Invalid room index or missing prompt" }, { status: 400 });
    }

    // Using Gemini 2.0's multi-modal capabilities for image generation
    const result = await generateText({
      model: google('gemini-2.0-flash-exp'),
      providerOptions: {
        google: {
          responseModalities: ['TEXT', 'IMAGE']
        }
      },
      prompt: buildCombinedPrompt(rooms),
    });

    console.log("the response data", result);

    // Extract images from files
    const images = result.files?.filter(file =>
      file.mediaType.startsWith('image/')
    ) || [];

    return NextResponse.json(
      {
        promptUsed: finalPrompt,
        roomGenerated: roomIndex >= 0 && roomIndex < rooms.length ? rooms[roomIndex].name : 'Custom',
        text: result.text,
        images: images.map(image => ({
          base64: image.base64,
          mediaType: image.mediaType
        })),
        hasImages: images.length > 0
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({
      error: "Failed to generate image",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}