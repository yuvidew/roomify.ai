"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ScanSearch, Search } from "lucide-react"
import { usePathname } from "next/navigation"
import { SearchCommand } from "./search-command"
import { useState } from "react"

export const NavMain = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem >
              <SidebarMenuButton isActive={"/dashboard" === pathname} tooltip={"Upload blue print"}>
                {<ScanSearch />}
                <span>Upload blue print</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem >
              <SidebarMenuButton onClick={() => setIsOpen(!isOpen)} tooltip={"Search"}>
                {<Search />}
                <span>Search</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* start to search modal */}
      <SearchCommand
        open={isOpen}
        onOpenChange={setIsOpen}
      />
      {/* end to search modal */}
    </>

  )
}
