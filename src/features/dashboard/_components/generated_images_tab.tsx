"use client";
import { Button } from '@/components/ui/button'
import { AiGeneratedImage } from '@/types/type'
import { DownloadIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
    rooms_images: AiGeneratedImage[]
}

/**
 * Displays AI-generated room images with a download action.
 * @param rooms_images generated image set, e.g. [{ $id: "img1", mediaType: "image/png", image_base64: "..." }].
 */
export const GeneratedImagesTab = ({ rooms_images }: Props) => {
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
                    <picture
                        key={$id}
                        className=' relative'
                    >
                        {/* start to download button */}
                        <div className=' absolute top-3 right-3'>
                            <Button size={"icon"} onClick={() => onDownload(`data:${mediaType};base64,${image_base64}`, "home")}>
                                <DownloadIcon />
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
        </section>
    )
}
