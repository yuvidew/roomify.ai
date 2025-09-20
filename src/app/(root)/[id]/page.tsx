import React from 'react'
import { DocumentIdView } from './view/DocumentIdView'
import { getQueryClient } from '@/lib/get-query-client'
import { onGetHomeDetails } from '@/features/documents/api_function';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';



export default async function DocumentIdPage ({ params }: { params: { id: string } }){
    const queryClient = getQueryClient();

    const {id} = params;

    await queryClient.prefetchQuery({
        queryKey : ["get-home-details" , id],
        queryFn : () => onGetHomeDetails(id)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <DocumentIdView id = {id}/>
        </HydrationBoundary>
    )
}
