"use client";

import { ImageCard } from '@/components/image-card';
import { useDeleteImage } from '@/features/generate-rooms-images/api/use-delete-image';
import { AiGeneratedImage } from '@/types/type'
import React from 'react'

interface Props {
    rooms_images: AiGeneratedImage[]
}

/**
 * Displays AI-generated room images with a download action.
 * @param rooms_images generated image set, e.g. [{ $id: "img1", mediaType: "image/png", image_base64: "..." }].
 */
export const GeneratedImagesTab = ({ rooms_images }: Props) => {
    const { mutate, isPending } = useDeleteImage()
    const onDownload = (base64Data: string, fileName: string) => {
        const link = document.createElement("a");

        link.href = base64Data;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
    return (
        <section className='bg-sidebar w-full h-full flex flex-col gap-4 p-4 rounded-md'>
            <div className='imgCont gap-3'>
                {rooms_images.map(({ mediaType, image_base64, $id }) => (
                    <ImageCard
                        key={$id}
                        mediaType={mediaType}
                        image_base64={image_base64}
                        id={$id}
                        onDelete={() => mutate(
                            { param: { id: $id } },
                        )}
                        onDownload={() => onDownload(`data:${mediaType};base64,${image_base64}`, "home")}
                        isLoading={isPending}
                    />
                ))}
            </div>
        </section>
    )
}
