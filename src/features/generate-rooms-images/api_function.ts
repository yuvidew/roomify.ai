import { client } from "@/lib/rpc"
import { AiGeneratedImage } from "@/types/type";



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