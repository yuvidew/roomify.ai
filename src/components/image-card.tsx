import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { useDeleteImage } from '@/features/generate-rooms-images/api/use-delete-image'
import { Download, ScanIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Hint } from './Hint'

interface Props {
    id: string,
    onDownload: () => void,
    image_base64: string,
    mediaType: string,
    onOpen : () => void
}

/**
 * Renders a generated image with controls for download and deletion.
 * @param id identifier of the generated image asset.
 * @param onDownload callback invoked when the download button is clicked.
 * @param image_base64 base64-encoded payload used as the image source.
 * @param mediaType MIME type used when constructing the data URL.
 */export const ImageCard = ({
    id,
    onDownload,
    image_base64,
    mediaType,
    onOpen
}: Props) => {
    const { mutate, isPending } = useDeleteImage()
    return (
        <picture
            key={id}
            className=' relative'
        >
            {/* start to download button */}
            <div className=' absolute top-3 right-3 flex items-center gap-3'>
                <Hint label='See full size' side='top' align='center'>
                    <Button
                        size={"icon"}
                        variant={"secondary"}
                        onClick={onOpen}
                    >
                        <ScanIcon />
                    </Button>
                </Hint>
                <Hint label='Delete' side='top' align='center'>
                    <Button
                        size={"icon"}
                        variant={"destructive"}
                        onClick={() => mutate(
                            { param: { id } },
                        )}
                    >
                        {isPending ? <Spinner /> : <Trash2 />}
                    </Button>
                </Hint>
                <Hint label='Download' side='top' align='center'>
                    <Button size={"icon"} onClick={onDownload}>
                        <Download />
                    </Button>
                </Hint>
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

