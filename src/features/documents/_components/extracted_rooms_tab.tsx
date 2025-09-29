"use client";

import { SearchWithDropDown } from '@/components/search-with-dropdown';
import { Button } from '@/components/ui/button';
import { RoomCard } from '@/features/extract-rooms/_components/room';
import {  Room } from '@/types/type'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

interface Props {
    rooms: Room[],
    ai_generated_images : number,
    id : string
}

/**
 * Lists extracted rooms with search/filter controls.
 * @param rooms array of room entries, e.g. [{ name: "Kitchen", type: "Kitchen", notes: "Needs renovation" }].
 * @param ai_generated_images number of AI-generated images available for the current document.
 * @param id identifier of the extraction session used for navigation.
 */
export const ExtractedRoomsTab = ({ rooms , ai_generated_images , id}: Props) => {
    const route = useRouter()
    const [selectRoom, setSelectRoom] = useState("");
    const roomsSignature = useMemo(
        () => rooms.map(({ type }, index) => `${index}:${type}`).join("|"),
        [rooms]
    );

    useEffect(() => {
        setSelectRoom("");
    }, [roomsSignature, id]);

    const unique_rooms = useMemo(() => {
        const rooms_type = [...new Set(rooms.map(({ type }) => type))];

        return rooms_type.map((type) => ({
            value: type,
            label: type,
            count: rooms.filter(room => room.type === type).length
        }));
    }, [rooms]);
    const filter_rooms = useMemo(() => {
        if (!selectRoom) {
            return rooms;
        }

        const normalized = selectRoom.toLowerCase();

        return rooms.filter(({ type }) =>
            type.toLowerCase().includes(normalized)
        );
    }, [rooms, selectRoom]);
    return (
        <section className=' flex flex-col bg-sidebar gap-4 p-4 rounded-md'>
            <div className=' flex items-center justify-between'>
                <SearchWithDropDown
                    rooms={unique_rooms}
                    onChangeValue={setSelectRoom}
                    selectedValue={selectRoom}
                    total_length={rooms.length || 0}
                    isShowIcons
                />

                {ai_generated_images !== 0 && (
                    <>
                    <Button 
                        onClick={() => route.push(`/extract-rooms?extract_room_id=${id}`)}
                        className=' lg:flex md:flex hidden'
                    >
                        <Sparkles className=' size-4' />
                        Generate images
                    </Button>
                    <Button 
                        size={"icon"}
                        onClick={() => route.push(`/extract-rooms?extract_room_id=${id}`)}
                        className=' lg:hidden md:hidden flex'
                    >
                        <Sparkles className=' size-4' />
                    </Button>
                    </>
                )}
            </div>

            {/* start to listing a extract rooms */}
            <div className=" grid lg:grid-cols-2 grid-cols-1 gap-2">
                {filter_rooms.map(
                    ({ type, name, notes, approxAreaSqFt, dimensions }, i) => (
                        <RoomCard
                            key={i}
                            type={type}
                            name={name}
                            notes={notes}
                            dimensions={dimensions}
                            approxAreaSqFt={approxAreaSqFt}
                        />
                    )
                )}
            </div>
            {/* end to listing a extract rooms */}
        </section>
    )
}
