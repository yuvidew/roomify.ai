"use client";

import { ImageCard } from '@/components/image-card';
import { ImageDialog } from '@/components/image-dialog';
import { AiGeneratedImage } from '@/types/type'
import React, { useState } from 'react'

interface Props {
    rooms_images: AiGeneratedImage[]
}

/**
 * Displays AI-generated room images with a download action.
 * @param rooms_images generated image set, e.g. [{ $id: "img1", mediaType: "image/png", image_base64: "..." }].
 */
export const GeneratedImagesTab = ({ rooms_images }: Props) => {
    const [imageData, setImageData] = useState({
        mediaType : "",
        image_base64 : ""
    })
    const [isOpen , setIsOpen] = useState(false)
    const onDownload = (base64Data: string, fileName: string) => {
        const link = document.createElement("a");

        link.href = base64Data;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
    return (
        <>
        {/* start to images dialog */}
        <ImageDialog 
            isOpen = {isOpen} 
            onIsOpen={setIsOpen} 
            rooms_image={`data:${imageData.mediaType};base64,${imageData.image_base64}`}
        />
        {/* end to images dialog */}
        <section className='bg-sidebar w-full h-full flex flex-col gap-4 p-4 rounded-md'>
            <div className='imgCont gap-3'>
                {rooms_images.map(({ mediaType, image_base64, $id }) => (
                    <ImageCard
                        key={$id}
                        mediaType={mediaType}
                        image_base64={image_base64}
                        id={$id}
                        onDownload={() => onDownload(`data:${mediaType};base64,${image_base64}`, "home")}
                        onOpen={() => {
                            setIsOpen(true);
                            setImageData({
                                mediaType,
                                image_base64
                            })
                        }}
                    />
                ))}
            </div>
        </section>
        </>
    )
}
