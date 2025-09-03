import { Room } from "@/types/type";
import axios from "axios";

/**
 * Uploads a blueprint file to the API and extracts room information.
 *
 * @param {FormData} file - The FormData object containing the blueprint file to be parsed.
 * @returns {Promise<any>} The extracted room data returned from the API.
 * @throws Will throw an error if the API request fails.
 */
export const onExtractRooms = async (file: FormData) => {
    try {
        const { data } = await axios.post("/api/parse-blueprint", file);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Sends extracted room data to the API and generates images for each room.
 *
 * @param {Room} rooms - The room object (or collection of rooms) containing details like name, type, dimensions, etc.
 * @returns {Promise<any>} The generated image data returned from the API.
 * @throws Will throw an error if the API request fails.
 */
export const onGenerate = async (rooms: Room) => {
    try {
        const { data } = await axios.post(
            "/api/generate-images",
            rooms,
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return data;
    } catch (error) {
        throw error;
    }
};
