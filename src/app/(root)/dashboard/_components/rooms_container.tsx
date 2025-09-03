"use client "
import React from 'react'
import { RoomCard } from './room'
import { useStoreRooms } from '@/zustand/useStoreRooms'

export const RoomsContainer = () => {
    const { rooms} = useStoreRooms();
    return (
        <section className=' flex flex-col gap-5 w-[70%] p-5'>
            {/* start to  Total floor area: */}
            <div className="rounded-lg border bg-muted/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                    Total floor area:{" "}
                    <span className="font-medium">{rooms.reduce((sum, room) => sum + room.approxAreaSqFt, 0)} sq ft</span>

                    {/* TODO : show the floor area */}
                </p>
            </div>
            {/* end to  Total floor area: */}

            <div className=' grid grid-cols-2 gap-3 overflow-y-auto hide-scrollbar h-[75vh]'>
                {rooms.length > 0 ? rooms.map((items , i) => (
                    <RoomCard
                        key={i}
                        {...items}
                    />
                )) : <></>}
            </div>
        </section>
    )
}
