import { client } from "@/lib/rpc"

/**
 * Fetch extracted rooms by ID.
 * @param {string} extract_room_id - The ID of the extracted room to fetch.
 * @returns {Promise<any>} Parsed JSON response with extracted rooms data.
 */

export interface ExtractedRoom {
    name: string;
    type: string;
    approxAreaSqFt: string;
    dimensions: string;
    notes: string;
    extract_room_id: string;
    $id: string;
    $sequence: number;
    $createdAt: string; // ISO date string
    $updatedAt: string; // ISO date string
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

/**
 * Get extracted rooms for a given extract-room ID.
 *
 * @param {string} extract_room_id - The extract-room identifier to query.
 * @returns {Promise<{ total: number; documents: ExtractedRoom[] }>} Total count and documents list.
 */
export const onGetExtractedRooms = async (extract_room_id: string): Promise<{ total: number, documents: ExtractedRoom[] }> => {
    const response = await client.api.extract_rooms[":extract_room_id"].$get({
        param: { extract_room_id }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch rooms.");
    }
    const json = await response.json()

    if ("message" in json) {
        throw new Error(json.message);
    }



    return {
        total: json.total,
        documents: json.documents as ExtractedRoom[]
    }
}
