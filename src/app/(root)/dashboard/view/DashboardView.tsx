"use client";

import { useState } from 'react';
import { ExtractImageFrom } from '../_components/extract_image_from';
import { HomeSection } from '../_components/home_section';
import { Room } from '@/types/type';
import { RoomsContainer } from '../_components/rooms_container';

export const DashboardView = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    return (
        <main className=" flex items-start h-full" >
            {/* start to extract image form */}
            <ExtractImageFrom/>
            {/* end to extract image form */}

            {/* start ai result section */}
            {rooms.length === 0 ? (
                <RoomsContainer/>
            ) : (
                <HomeSection/>
            )}
            {/* end  ai result section */}

        </main>
    )
}
