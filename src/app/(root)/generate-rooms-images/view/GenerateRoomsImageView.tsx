"use client"
import { Button } from '@/components/ui/button';
import { Bookmark, RotateCcw } from 'lucide-react';
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"


import Image from 'next/image';
import { useGetGeneratedRoomsImages } from '@/features/generate-rooms-images/api/use-get-generated-rooms-images';
import { ErrorCard } from '@/components/ErrorCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
    extract_room_id: string;
}

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
                {/* start to pagination and save/regenerate button */}
                <div className=' flex items-center justify-between'>
                    {/* start to save or regenerate button */}
                    <div className=' flex items-center gap-3'>
                        <Button>
                            <Bookmark /> Save
                        </Button>

                        <Button variant={"outline"}>
                            <RotateCcw />
                            Re-Generate
                        </Button>
                    </div>
                    {/* end to save or regenerate button */}
                </div>
                {/* end to pagination and save/regenerate button */}

                {/* start to listing images */}
                <div className='imgCont gap-3'>
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <Skeleton key={i} className=' mb-3 w-full h-[340px]' />
                    ))}
                </div>
                {/* end to listing images */}
            </div>
            {/* end to listing generated rooms image */}
            </main>
        )
    }

    return (
        <main className=" p-6 h-full w-full">
            {/* start to listing generated rooms image */}
            <div className=' bg-sidebar w-full h-full flex flex-col gap-4 p-4 rounded-md'>
                {/* start to pagination and save/regenerate button */}
                <div className=' flex items-center justify-between'>
                    {/* start to save or regenerate button */}
                    <div className=' flex items-center gap-3'>
                        <Button>
                            <Bookmark /> Save
                        </Button>

                        <Button variant={"outline"}>
                            <RotateCcw />
                            Re-Generate
                        </Button>
                    </div>
                    {/* end to save or regenerate button */}
                </div>
                {/* end to pagination and save/regenerate button */}

                {/* start to listing images */}
                <ScrollArea className=' w-full h-[585px]'>
                    <div className='imgCont gap-3'>
                        {rooms_images?.documents.map(({ mediaType , image_base64 ,  $id}) => (
                            <Image
                                key={$id}
                                src={`data:${mediaType};base64,${image_base64}`}
                                alt={`images-${$id}`}
                                className="w-full mb-3 rounded-md"
                                layout="responsive"      // Responsive layout
                                width={16}               // Aspect ratio: width
                                height={9}

                            />
                        ))}
                    </div>
                </ScrollArea>
                {/* end to listing images */}
            </div>
            {/* end to listing generated rooms image */}
        </main>
    )
}
