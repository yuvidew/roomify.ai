"use client"


import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HelpCircle, Settings } from "lucide-react"
import { useState } from "react"
import { SettingModel } from "./setting-dialog"

export const NavSecondary = () => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <>
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
            <SidebarMenuItem >
              <SidebarMenuButton onClick={() => setIsOpen(!isOpen)} >
                  <Settings />
                  <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem >
              <SidebarMenuButton >
                  <HelpCircle />
                  <span>Get Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    {/* start to setting modal */}
    <SettingModel open = {isOpen} onOpenChange={setIsOpen} />
    {/* end to setting modal */}
    </>
  )
}
