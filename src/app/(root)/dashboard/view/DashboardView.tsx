"use client";

import { ExtractImageFrom } from '../_components/extract_image_from';
import { HomeSection } from '../_components/home_section';
import { RoomsContainer } from '../_components/rooms_container';
import { useStoreRooms } from '@/zustand/useStoreRooms';

export const DashboardView = () => {
    const {rooms} = useStoreRooms()
    return (
        <main className=" flex items-start h-full" >
            {/* start to extract image form */}
            <ExtractImageFrom/>
            {/* end to extract image form */}

            {/* start ai result section */}
            {rooms.length !== 0 ? (
                <RoomsContainer/>
            ) : (
                <HomeSection/>
            )}
            {/* end  ai result section */}

        </main>
    )
}
