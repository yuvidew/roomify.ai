import React from 'react'
import { GenerateRoomsImageView } from './view/GenerateRoomsImageView'
import { getQueryClient } from '@/lib/get-query-client'
import { onGetGeneratedRoomsImages } from '@/features/generate-rooms-images/api_function'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
    // In Next.js 14+, searchParams is async and must be awaited
    searchParams: Promise<{ extract_room_id?: string }>
}

/**
 * Generate Rooms Images page.
 * Renders view using the provided `extract_room_id`.
 * @param searchParams - Query params with optional `extract_room_id`.
 */
const GenerateRoomsImagePage = async ({ searchParams }: Props) => {
    const queryClient = getQueryClient();

    const params = await searchParams;
    const extract_room_id = params.extract_room_id!;

    await queryClient.prefetchQuery({
        queryKey: ["get-generated-images"],
        queryFn: () => onGetGeneratedRoomsImages(extract_room_id)
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <GenerateRoomsImageView extract_room_id={extract_room_id} />
        </HydrationBoundary>
    )
}

export default GenerateRoomsImagePage
