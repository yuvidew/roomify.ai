"use client";

import { SearchWithDropDown } from '@/components/search-with-dropdown';
import { RoomCard } from '@/features/extract-rooms/_components/room';
import { Room } from '@/types/type'
import React, { useMemo, useState } from 'react'

interface Props {
    rooms: Room[]
}

/**
 * Lists extracted rooms with search/filter controls.
 * @param rooms array of room entries, e.g. [{ name: "Kitchen", type: "Kitchen", notes: "Needs renovation" }].
 */
export const ExtractedRoomsTab = ({ rooms }: Props) => {
    const [selectRoom, setSelectRoom] = useState("");
    const unique_rooms = useMemo(() => {
        const rooms_type = [...new Set(rooms.map(({ type }) => type))];

        return rooms_type.map((type) => ({
            value: type,
            label: type,
            count: rooms.filter(room => room.type === type).length
        }));
    }, [rooms]);
    const filter_rooms = useMemo(() => {
        return rooms.filter(({ type }) =>
            type.toLowerCase().includes(selectRoom.toLowerCase())
        );
    }, [rooms, selectRoom]);
    return (
        <section className=' flex flex-col bg-sidebar gap-4 p-4 rounded-md'>
            <SearchWithDropDown
                rooms={unique_rooms}
                onChangeValue={setSelectRoom}
                isShowIcons
            />

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
