import React from 'react'
import { GenerateRoomsImageView } from './view/GenerateRoomsImageView'
import { getQueryClient } from '@/lib/get-query-client'
import { onGetGeneratedRoomsImages } from '@/features/generate-rooms-images/api_function'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface Props {
    searchParams: { extract_room_id?: string }
}

/**
 * Generate Rooms Images page.
 * Renders view using the provided `extract_room_id`.
 * @param searchParams - Query params with optional `extract_room_id`.
 */
const GenerateRoomsImagePage = async ({ searchParams }: Props) => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["get-generated-images"],
        queryFn: () => onGetGeneratedRoomsImages(searchParams.extract_room_id!)
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <GenerateRoomsImageView extract_room_id={searchParams.extract_room_id!} />
        </HydrationBoundary>
    )
}

export default GenerateRoomsImagePage
