import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Download, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
    id : string,
    onDelete : () => void,
    onDownload : () => void,
    isLoading : boolean,
    image_base64 : string,
    mediaType : string
}

export const ImageCard = ({
    id,
    onDelete,
    onDownload,
    isLoading,
    image_base64,
    mediaType
} : Props) => {
    return (
        <picture
            key={id}
            className=' relative'
        >
            {/* start to download button */}
            <div className=' absolute top-3 right-3 flex items-center gap-3'>
                <Button
                    size={"icon"}
                    variant={"destructive"}
                    onClick={onDelete}
                >
                    {isLoading ? <Spinner /> : <Trash2 />}
                </Button>
                <Button size={"icon"} onClick={onDownload}>
                    <Download />
                </Button>
            </div>
            {/* end to download button */}
            <Image
                src={`data:${mediaType};base64,${image_base64}`}
                alt={`images-${id}`}
                className="w-full mb-3 rounded-md"
                layout="responsive"
                width={16}
                height={9}

            />
        </picture>
    )
}
