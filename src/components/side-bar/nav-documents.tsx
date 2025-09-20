"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useGetRoomsList } from "@/features/documents/api/use-get-rooms-list"
import { EllipsisVertical, Ellipsis, Folder, Share, Trash2, House } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import Link from "next/link"

export const NavDocuments = () => {
    // TODO: implement a more click button logic if i click the more button then show the all list 
    const { isMobile } = useSidebar()

    const { data, isLoading, isError } = useGetRoomsList()


    const documents = Array.isArray(data?.documents) ? data.documents : []

    if (isError) {
        return null
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Documents</SidebarGroupLabel>
            <SidebarMenu>
                {isLoading ? (
                    [1, 2, 3, 4].map((item) => (
                        <Skeleton key={item} className=" h-8 rounded-sm" />
                    ))
                ) : (
                    documents.map((item) => (
                        <SidebarMenuItem key={item.$id}>
                            <SidebarMenuButton asChild>
                                <Link href={`/${item.$id}`}>
                                    <House />
                                    <span className=" w-[80%] truncate">{item.home_title}</span>
                                </Link>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction
                                        showOnHover
                                        className="data-[state=open]:bg-accent rounded-sm"
                                    >
                                        <EllipsisVertical />
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-24 rounded-lg"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <DropdownMenuItem>
                                        <Folder />
                                        <span>Open</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Share />
                                        <span>Share</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">
                                        <Trash2 />
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    ))
                )}
                {documents.length > 5 && (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70">
                            <Ellipsis className="text-sidebar-foreground/70" />
                            <span>More</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}
