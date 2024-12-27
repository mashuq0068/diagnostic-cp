// import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

// Dummy team object with logo for "cpMed"
const teams = [
  {
    name: "cpMed",
    plan: "Control Panel",
    logo: "/path/to/diagnostic-cp-logo.png", // replace with actual path to your logo
  },
]

export function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const activeTeam = teams[0] // Static active team since no dropdown is needed

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <img src='/images/Code Prophet.png' alt="Team Logo" className="size-8" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeTeam.name}</span>
            <span className="truncate text-xs">{activeTeam.plan}</span>
          </div>
          <ChevronsUpDown className="ml-auto lg:block hidden" />
          <SidebarTrigger className="-ml-1 lg:hidden block" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
