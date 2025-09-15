import { getQueryClient } from "@/lib/get-query-client";
import { ExtractRooms } from "./view/ExtractRooms";
import { onGetExtractedRooms } from "@/features/extract-rooms/api_functions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface Props {
    // In Next.js App Router, searchParams is async and must be awaited
    searchParams: Promise<{ extract_room_id?: string }>
}

/**
 * Extract Rooms page.
 * Prefetches extracted rooms and hydrates client state.
 * @param searchParams - Query params with optional `extract_room_id`.
 */
export default async function ExtractRoomsPage({ searchParams }: Props) {
    const queryClient = getQueryClient();

    const params = await searchParams;
    const extract_room_id = params.extract_room_id!;

    await queryClient.prefetchQuery({
        queryKey: ["get-extracted-rooms"],
        queryFn: () => onGetExtractedRooms(extract_room_id)
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ExtractRooms extract_room_id={extract_room_id} />
        </HydrationBoundary>
    )
}
