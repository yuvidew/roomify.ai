"use client"
import React from 'react';


import Image from 'next/image';
import { useGetGeneratedRoomsImages } from '@/features/generate-rooms-images/api/use-get-generated-rooms-images';
import { ErrorCard } from '@/components/ErrorCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Props {
    extract_room_id: string;
}

/**
 * Generate Rooms Images view.
 * Lists generated images for a given extracted room.
 * @param param0.extract_room_id - The extracted room ID.
 */
export const GenerateRoomsImageView = ({ extract_room_id }: Props) => {
    const { data :rooms_images, isLoading, isError } = useGetGeneratedRoomsImages(extract_room_id);


    if (isError) {
        return (
            <main className=" h-full w-full flex items-center justify-center">
                <ErrorCard message="Failed to fetch ai Generated rooms images" />
            </main>
        )
    }

    if (isLoading) {
        return (
            <main className=" p-6 h-full w-full">
                {/* start to listing generated rooms image */}
            <div className=' bg-sidebar w-full h-full flex flex-col gap-4 p-4 rounded-md'>

                {/* start to listing images */}
                <div className='imgCont gap-3'>
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <Skeleton key={i} className=' mb-3 w-full h-[370px]' />
                    ))}
                </div>
                {/* end to listing images */}
            </div>
            {/* end to listing generated rooms image */}
            </main>
        )
    }

    const onDownload = (base64Data: string, fileName: string) => {
        const link = document.createElement("a");

        link.href = base64Data;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    }

    return (
        <main className=" p-6 h-full w-full">
            {/* start to listing generated rooms image */}
            <div className=' bg-sidebar w-full h-full flex flex-col gap-4 p-4 rounded-md'>
                {/* start to listing images */}
                    <div className='imgCont gap-3'>

                        {rooms_images?.documents.map(({ mediaType , image_base64 ,  $id}) => (
                            <picture
                                key={$id}
                                className=' relative'
                            >
                                {/* start to download button */}
                                <div className=' absolute top-3 right-3'>
                                    <Button size={"icon"} onClick={() => onDownload(`data:${mediaType};base64,${image_base64}` , "home")}>
                                        <Download/>
                                    </Button>
                                </div>
                                {/* end to download button */}
                                <Image
                                    src={`data:${mediaType};base64,${image_base64}`}
                                    alt={`images-${$id}`}
                                    className="w-full mb-3 rounded-md"
                                    layout="responsive"      
                                    width={16}               
                                    height={9}
    
                                />
                            </picture>
                        ))}
                    </div>
                {/* end to listing images */}
            </div>
            {/* end to listing generated rooms image */}
        </main>
    )
}
