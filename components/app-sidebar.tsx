import type * as React from "react";
import { FolderKanban } from "lucide-react";

import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample data structure for the navigation
const data = {
  navMain: [
    {
      title: "Home",
      url: "#",
      items: [
        {
          title: "Carousel",
          url: "#",
          id: "home-carousel",
        },
      ],
    },
    {
      title: "Campus",
      url: "#",
      items: [
        {
          title: "Hostel",
          url: "#",
          id: "campus-hostel",
        },
        {
          title: "Library",
          url: "#",
          id: "campus-library",
        },
        {
          title: "Lab",
          url: "#",
          id: "campus-lab",
        },
        {
          title: "Faculty",
          url: "#",
          id: "campus-faculty",
        },
      ],
    },
  ],
};

export function AppSidebar({
  className,
  sidebarTitle = "Admin Portal",
  ...props
}: React.ComponentProps<typeof Sidebar> & { sidebarTitle?: string }) {
  return (
    <Sidebar className={className} title={sidebarTitle} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <FolderKanban className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Admin Portal</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-xs text-muted-foreground">
          <p>© 2025 Your Company</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
