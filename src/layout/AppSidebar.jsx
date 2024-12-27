import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "../components/ui/team-switcher";
import { NavMain } from "../components/ui/nav-main";
import SidebarItems from "./SidebarItems";
function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={SidebarItems.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarItems.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
