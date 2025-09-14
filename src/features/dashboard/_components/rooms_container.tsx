"use client ";
import React, { useEffect, useState } from "react";
import { RoomCard } from "../../extract-rooms/_components/room";
import { useStoreRooms } from "@/zustand/useStoreRooms";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { useGenerateRoomsImage } from "../../../app/(root)/dashboard/hooks/useDashboard";
import Spinner from "@/components/Spinner";
import Image from "next/image";

export const RoomsContainer = () => {
    const { rooms } = useStoreRooms();
    const { mutate, isPending, data } = useGenerateRoomsImage();
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setImages(
                data.map((img) => `data:${img.mediaType.toString()};base64,${img.base64}`)
            );
        }
    }, [data]);

    console.log("images" , images , data);

    return (
        <section className=" flex flex-col gap-5 w-[70%] p-5">
            {/* start to  Total floor area: */}
            <div className="rounded-lg border bg-muted/50 p-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Total floor area:{" "}
                    <span className="font-medium">
                        {rooms.reduce((sum, room) => sum + room.approxAreaSqFt, 0)} sq ft
                    </span>
                </p>

                <Button
                    disabled={!rooms.length}
                    onClick={() => mutate(rooms)}
                >
                    {isPending ? (
                        <>
                            <Spinner />
                            Generating images...
                        </>
                    ) : (
                        <>
                            <ImageIcon />
                            Generate images
                        </>
                    )}
                </Button>
            </div>
            {/* end to  Total floor area: */}

            {/* start to show image or floor plan */}
            {images.length > 0 ? (
                <div className=" grid grid-cols-2 gap-3 overflow-y-auto hide-scrollbar h-[75vh]">
                    {/* <div className="relative w-full h-full"> */}
                    {images.map((img , i) => (
                        <Image
                            key={i}
                            src={img}
                            alt="img-1"
                            width={900}
                            height={900}
                            className="object-cover h-full rounded-lg"
                        />
                    ))}
                    {/* </div> */}
                </div>
            ) : (
                <div className=" grid grid-cols-2 gap-3 overflow-y-auto hide-scrollbar h-[75vh]">
                    {rooms.length > 0 ? (
                        rooms.map((items, i) => <RoomCard key={i} {...items} />)
                    ) : (
                        <></>
                    )}
                </div>
            )}
            {/* end to show image or floor plan */}
        </section>
    );
};
