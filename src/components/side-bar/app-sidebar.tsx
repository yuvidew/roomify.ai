"use client"

import * as React from "react"



import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AirVent, Camera, Database, File,  HelpCircle, ScanSearch,  Search, Settings, Text, } from "lucide-react"
import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { Logo } from "../Logo"
import { NavSecondary } from "./nav-secondary"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Upload blue print",
            url: "/dashboard",
            icon: ScanSearch,
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: Camera,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: File,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: AirVent,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircle,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "#",
            icon: Database,
        },
        {
            name: "Reports",
            url: "#",
            icon: Text,
        },
        {
            name: "Word Assistant",
            url: "#",
            icon: File,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Logo isTitleShow />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
                <NavDocuments items={data.documents} />
                <NavSecondary  />
            </SidebarContent>
            <SidebarFooter>
                <NavUser  />
            </SidebarFooter>
        </Sidebar>
    )
}
