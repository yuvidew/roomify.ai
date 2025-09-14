"use client";

import React, { useMemo, useState } from "react";
import rooms from "@/lib/demy.json";
import { SearchWithDropDown } from "@/components/search-with-dropdown";
import { RoomCard } from "../../../../features/extract-rooms/_components/room";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { ExtractRoomsForm } from "../../../../features/extract-rooms/_components/extract_rooms_form";

export const ExtractRooms = () => {
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

    return (
        <main className=" p-6 h-full flex items-start gap-4">
            {/* start to listing extracted rooms by AI*/}
            <div className="bg-muted w-[70%] flex flex-col gap-4 p-4 h-full rounded-md">
                <div className=" flex items-center justify-between">
                    <SearchWithDropDown
                        rooms={unique_rooms}
                        onChangeValue={setSelectRoom}
                        isShowIcons
                    />

                    {rooms?.length > 10 && (
                        <Pagination className=" justify-end">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""
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
                    )}
                </div>

                {/* start to listing a extract rooms */}
                <section className=" grid grid-cols-2 gap-2">
                    {paginating_rooms.map(({ type, name, notes, approxAreaSqFt }, i) => (
                        <RoomCard
                            key={i}
                            type={type}
                            name={name}
                            notes={notes}
                            approxAreaSqFt={approxAreaSqFt}
                        />
                    ))}
                </section>
                {/* end to listing a extract rooms */}
            </div>
            {/* end to listing extracted rooms by AI*/}

            {/* start to text area */}
            <div className="  w-[30%]">
                <ExtractRoomsForm/>
            </div>
            {/* end to text area */}
        </main>
    );
};
