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
import { EllipsisVertical, Ellipsis, Folder, Trash2, House } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useDeleteHomeDocument } from "@/features/dashboard/api/use-delete-home-document"
import Spinner from "../Spinner"
import { useMemo, useState } from "react"
import { Hint } from "../Hint"
import { ScrollArea } from "../ui/scroll-area"
// import { ScrollArea } from "../ui/scroll-area"

export const NavDocuments = () => {
    const { data, isLoading, isError } = useGetRoomsList();
    const { mutate, isPending } = useDeleteHomeDocument();
    const { id } = useParams();

    const { isMobile } = useSidebar();
    const router = useRouter()

    const [showAll, setShowAll] = useState(false);

    const documentsData = data?.documents

    const documents = useMemo(() => {
        return Array.isArray(documentsData) ? documentsData : []
    }, [documentsData])

    const visibleDocuments = useMemo(() => {
        return showAll ? documents : documents.slice(0, 5)
    }, [documents, showAll])

    const shouldEnableScroll = visibleDocuments.length > 6
    const scrollAreaClasses = shouldEnableScroll ? "max-h-72 pr-1" : "pr-1"

    if (isError) {
        return null
    }



    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Documents</SidebarGroupLabel>
            {/* <ScrollArea className=" h-60 w-80"> */}

            <SidebarMenu>
                <ScrollArea className={scrollAreaClasses}>
                    <div className="flex flex-col gap-3">
                        {isLoading ? (
                            [1, 2, 3, 4].map((item) => (
                                <Skeleton key={item} className=" h-8 rounded-sm" />
                            ))
                        ) :
                            documents.length > 0 ? visibleDocuments.map((item) => (
                                <SidebarMenuItem key={item.$id} className={showAll ?"w-[60%] lg:w-[57%] md:w-[56%]" : "w-[64%] lg:w-[61.5%] md:w-[61.5%]"}>
                                    <Hint side="left" align="center" label={item.home_title}>
                                        <SidebarMenuButton asChild isActive={item.$id === id}>
                                            <Link href={`/${item.$id}`}>
                                                <House />
                                                <span className=" w-[85%] truncate">{item.home_title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </Hint>
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
                                            <DropdownMenuItem onClick={() => router.push(`/${item.$id}`)}>
                                                <Folder />
                                                <span>Open</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() =>
                                                    mutate(
                                                        { param: { extract_room_id: item.$id } },
                                                        {
                                                            onSuccess: () => router.back()
                                                        }
                                                    )
                                                }
                                            >
                                                {
                                                    isPending ? (
                                                        <Spinner />
                                                    ) : (<>
                                                        <Trash2 />
                                                        <span>Delete</span>
                                                    </>)
                                                }
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            ))
                                :
                                <SidebarMenuItem className=" text-sm">
                                    No documents here..
                                </SidebarMenuItem>
                        }
                    </div>
                </ScrollArea>
                {documents.length > 5 && (
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70" onClick={() => setShowAll(prev => !prev)}>
                            <Ellipsis className="text-sidebar-foreground/70" />
                            <span>More</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
            </SidebarMenu>
            {/* </ScrollArea> */}
        </SidebarGroup >
    )
}
