import { useQuery } from "@tanstack/react-query"
import { onGetGeneratedRoomsImages } from "../api_function"


export const useGetGeneratedRoomsImages = (extract_room_id  :string) => {
    return useQuery({
        queryKey : ["get-generated-images"],
        queryFn: () => onGetGeneratedRoomsImages(extract_room_id!)
    })
} 