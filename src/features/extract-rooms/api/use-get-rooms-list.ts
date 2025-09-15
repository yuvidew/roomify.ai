import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"

export const useGetRoomsList = () => {
    return useQuery({
        queryKey : ["get-rooms-list"],
        queryFn : async () => {
            const response = await client.api.extract_rooms.get_rooms_all_list.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch rooms.");
            }

            console.log("the fetther form", await response.json());

            return await response.json()
        }
    })
}