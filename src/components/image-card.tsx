import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useDeleteImage } from "@/features/generate-rooms-images/api/use-delete-image";
import { Download, EllipsisVertical, ScanIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "./ui/sidebar";

interface Props {
    id: string;
    onDownload: () => void;
    image_base64: string;
    mediaType: string;
    onOpen: () => void;
}

/**
 * Renders a generated image with controls for download and deletion.
 * @param id identifier of the generated image asset.
 * @param onDownload callback invoked when the download button is clicked.
 * @param image_base64 base64-encoded payload used as the image source.
 * @param mediaType MIME type used when constructing the data URL.
 */ export const ImageCard = ({
    id,
    onDownload,
    image_base64,
    mediaType,
    onOpen,
}: Props) => {
    const { mutate, isPending } = useDeleteImage();
    const { isMobile } = useSidebar();
    return (
        <picture key={id} className=" relative">
            {/* start to download button */}
            <div className=" absolute top-3 right-3 flex items-center gap-3">
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant={"secondary"}>
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-24 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                    >
                        <DropdownMenuItem onClick={onDownload}>
                            <Download /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onOpen}>
                            <ScanIcon /> Zoom
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() => mutate({ param: { id } })}
                        >
                            {isPending ? (
                                <Spinner />
                            ) : (
                                <>
                                    <Trash2 />
                                    <span>Delete</span>
                                </>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
    );
};
