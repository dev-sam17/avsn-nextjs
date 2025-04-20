"use client";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useContentContext } from "@/hooks/use-content-context";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    items: {
      title: string;
      url: string;
      id: string;
      isActive?: boolean;
    }[];
  }[];
}

export function NavMain({ items }: NavMainProps) {
  const { setActiveSection, activeSection } = useContentContext();
  const handleSectionClick = (
    sectionId: string,
    sectionTitle: string,
    pageTitle: string
  ) => {
    setActiveSection({
      id: sectionId,
      title: sectionTitle,
      pageTitle: pageTitle,
    });
  };

  return (
    <>
      {items.map((item) => (
        <Collapsible
          key={item.title}
          defaultOpen={item.items.some(
            (subItem) => activeSection?.id === subItem.id || subItem.isActive
          )}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between hover:text-emerald-700">
                {item.title}
                <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 group-data-[state=open]/collapsible:text-emerald-600" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isActive =
                          activeSection?.id === subItem.id || subItem.isActive;
                        return (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              isActive={isActive}
                              className={cn(
                                "flex w-full justify-between transition-colors",
                                isActive
                                  ? "bg-emerald-100 text-emerald-900 font-medium"
                                  : "",
                                !isActive &&
                                  "hover:bg-emerald-50 hover:text-emerald-700"
                              )}
                              onClick={() =>
                                handleSectionClick(
                                  subItem.id,
                                  subItem.title,
                                  item.title
                                )
                              }
                            >
                              {subItem.title}
                              {isActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                              )}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}
