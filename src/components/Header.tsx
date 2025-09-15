"use client"
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from './ModeToggle'
import { usePathname } from 'next/navigation'

const HEADER_TITLES: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/extract-rooms": "Extracted Rooms",
    "/generate-rooms-images" : "Generated rooms images"
}

export const Header = () => {
    const pathname = usePathname();
    const title = HEADER_TITLES[pathname] ?? "";
    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1 cursor-pointer" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">
                    {title}
                </h1>
                <div className="ml-auto flex items-center gap-2">
                    <ModeToggle/>
                </div>
            </div>
        </header>
    )
}
