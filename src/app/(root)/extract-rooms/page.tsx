import { getQueryClient } from "@/lib/get-query-client";
import { ExtractRooms } from "./view/ExtractRooms";
import { onGetExtractedRooms } from "@/features/extract-rooms/api_functions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
    searchParams : { extract_room_id?: string } 
}

/**
 * Extract Rooms page.
 * Prefetches extracted rooms and hydrates client state.
 * @param searchParams - Query params with optional `extract_room_id`.
 */
export default async function ExtractRoomsPage({searchParams} : Props) {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey : ["get-extracted-rooms"],
        queryFn : () => onGetExtractedRooms(searchParams.extract_room_id!)
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ExtractRooms extract_room_id={searchParams.extract_room_id!} />
        </HydrationBoundary>
    )
}
