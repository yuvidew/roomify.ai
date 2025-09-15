import { client } from "@/lib/rpc"

type AiGeneratedImage = {
    $collectionId: string;
    $createdAt: string; // ISO timestamp
    $databaseId: string;
    $id: string;
    $permissions: string[]; // e.g. ['read("user:...")']
    $sequence: number;
    $updatedAt: string; // ISO timestamp
    extract_room_id: string;
    image_base64: string;
    mediaType: string; // e.g. "image/png"
    save: boolean;
    text: string;
};

export const onGetGeneratedRoomsImages = async (extract_room_id: string) => {
    const response = await client.api.generate_rooms_images[":extract_room_id"].$get({
        param: { extract_room_id }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch task.");
    }

    const json = await response.json()

    if ("message" in json) {
        throw new Error(json.message);
    }



    return {
        total: json.total,
        documents: json.documents as AiGeneratedImage[],
    }

}