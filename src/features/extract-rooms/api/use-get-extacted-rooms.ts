import { useQuery } from "@tanstack/react-query"
import { onGetExtractedRooms } from "../api_functions"

export const useGetExtractedRooms =  (extract_room_id  :string) => {
    return useQuery({
        queryKey : ["get-extracted-rooms"],
        queryFn : () => onGetExtractedRooms(extract_room_id),
    })
}