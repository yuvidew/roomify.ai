import { useQuery } from "@tanstack/react-query"
import { onGetExtractedRooms } from "../api_functions"

export const useGetExtractedRooms =  (extract_room_id  :string) => {
    return useQuery({
        queryKey : ["get-extracted-rooms" , extract_room_id],
        queryFn : () => onGetExtractedRooms(extract_room_id),
        enabled : Boolean(extract_room_id)
    })
}