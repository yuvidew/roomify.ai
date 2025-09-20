import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"

export const useGetRoomsList = () => {
    return useQuery({
        queryKey : ["get-rooms-list"],
        queryFn : async () => {
            const response = await client.api.documents["get-rooms-all-list"].$get();

            if (!response.ok) {
                throw new Error("Failed to fetch rooms.");
            }
            return await response.json()
        }
    })
}