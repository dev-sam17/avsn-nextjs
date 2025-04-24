import type * as React from "react";

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
// import { LogoutButton } from "./auth/logout-button";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

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
  sidebarTitle = "Images Portal",
  ...props
}: React.ComponentProps<typeof Sidebar> & { sidebarTitle?: string }) {
  const router = useRouter();
  return (
    <Sidebar className={className} title={sidebarTitle} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Image Portal</span>
                  <span className="">AVSN Image Portal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="flex justify-center">
        {/* <LogoutButton /> */}
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg "
          onClick={() => router.push("/admin")}
        >
          Back To Portal
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
