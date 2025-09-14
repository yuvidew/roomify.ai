"use client";

import React, { useMemo, useState } from "react";
// import rooms from "@/lib/demy.json";
import { SearchWithDropDown } from "@/components/search-with-dropdown";
import { RoomCard } from "../../../../features/extract-rooms/_components/room";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ExtractRoomsForm } from "../../../../features/extract-rooms/_components/extract_rooms_form";
import { useGetExtractedRooms } from "@/features/extract-rooms/api/use-get-extacted-rooms";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorCard } from "@/components/ErrorCard";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface Props {
    extract_room_id: string;
}

export const ExtractRooms = ({ extract_room_id }: Props) => {
    const { data, isLoading, isError } = useGetExtractedRooms(extract_room_id);
    const [isOpen, setIsOpen] = useState(false)

    const rooms = data?.documents || [];

    const [currentPage, setCurrentPage] = useState(1);
    const [selectRoom, setSelectRoom] = useState("");

    const REVIEWS_PER_PAGE = 4;
    const unique_rooms = useMemo(() => {
        const rooms_type = [...new Set(rooms.map(({ type }) => type))];

        return rooms_type.map((type) => ({
            value: type,
            label: type,
        }));
    }, [rooms]);

    const filter_rooms = useMemo(() => {
        return rooms.filter(({ type }) =>
            type.toLowerCase().includes(selectRoom.toLowerCase())
        );
    }, [rooms, selectRoom]);

    const paginating_rooms = useMemo(() => {
        const start_index = (currentPage - 1) * REVIEWS_PER_PAGE;
        const end_index = start_index + REVIEWS_PER_PAGE;

        return filter_rooms.slice(start_index, end_index);
    }, [filter_rooms, currentPage]);

    const totalPages = Math.ceil(filter_rooms.length / REVIEWS_PER_PAGE);


    if (isError) {
        return (
            <main className=" h-full w-full flex items-center justify-center">
                <ErrorCard message="Failed to fetch ai extracted rooms" />
            </main>
        )
    }

    return (
        <>
            <main className=" p-6 h-full lg:flex items-start relative gap-4">
                {/* start to listing extracted rooms by AI*/}
                <div className="bg-sidebar lg:w-[70%] flex flex-col gap-4 p-4 h-full rounded-md">
                    <div className=" flex items-center justify-between">
                        <SearchWithDropDown
                            rooms={unique_rooms}
                            onChangeValue={setSelectRoom}
                            isShowIcons
                        />

                        {isLoading ? (
                            <></>
                        ) : (
                            rooms?.length > 5 && (
                                <Pagination className=" justify-end">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                className={`cursor-pointer ${currentPage === 1
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                                    }`}
                                                onClick={() =>
                                                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                                                }
                                                aria-disabled={currentPage === 1}
                                            />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext
                                                className={`cursor-pointer ${currentPage === totalPages
                                                    ? "pointer-events-none opacity-50"
                                                    : ""
                                                    }`}
                                                onClick={() =>
                                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                                }
                                                aria-disabled={currentPage === totalPages}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )
                        )}
                    </div>

                    {/* start to listing a extract rooms */}
                    <section className=" grid lg:grid-cols-2 grid-cols-1 gap-2">
                        {isLoading
                            ? [1, 2, 3]
                                .map((_, i) => <Skeleton key={i} className=" h-full w-full" />)
                            : paginating_rooms.map(
                                ({ type, name, notes, approxAreaSqFt }, i) => (
                                    <RoomCard
                                        key={i}
                                        type={type}
                                        name={name}
                                        notes={notes}
                                        approxAreaSqFt={approxAreaSqFt}
                                    />
                                )
                            )}
                    </section>
                    {/* end to listing a extract rooms */}
                </div>
                {/* end to listing extracted rooms by AI*/}

                {/* start to text area */}
                <div className="  lg:w-[30%] lg:flex hidden">
                    <ExtractRoomsForm rooms={rooms} extract_room_id={extract_room_id} />
                </div>
                {/* end to text area */}

                {/* start to mobile extractRooms from */}
                <div className="lg:hidden fixed bottom-2.5 right-2.5">
                    <Button onClick={() => setIsOpen(true)}>
                        <Sparkles /> Generate Images
                    </Button>
                </div>
                {/* end to mobile extractRooms from */}
            </main>

            {/* start to drawer form */}
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <div className=" flex flex-col gap-2">
                            <VisuallyHidden>
                                <DrawerTitle></DrawerTitle>
                                <DrawerDescription></DrawerDescription>
                            </VisuallyHidden>
                            <ExtractRoomsForm rooms={rooms} extract_room_id={extract_room_id} />
                            <DrawerClose asChild>
                                <Button variant={"outline"} className=" w-full" type="button">
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
            {/* end to drawer form */}
        </>
    );
};
