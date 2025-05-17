"use client";
import { ChevronDown, FolderPlus } from "lucide-react";

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
import { ActivityForm } from "./activity-form";
import { useActivities } from "@/hooks/use-activities";
import { format } from "date-fns";

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
  const { setActiveSection } = useContentContext();
  const { activities, activeActivityId, setActiveActivityId } = useActivities();

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

    // Reset active activity when navigating to a non-activity section
    if (!sectionId.startsWith("activity-")) {
      setActiveActivityId(null);
    }
  };

  const handleActivityClick = (activityId: string) => {
    setActiveActivityId(activityId);

    // Find the activity to get its title
    const activity = activities.find((a) => a.id === activityId);
    if (activity) {
      setActiveSection({
        id: activityId,
        title: activity.title,
        pageTitle: "Activities",
      });
    }
  };

  return (
    <>
      {items.map((item) => {
        // Special handling for Activities section
        if (item.title === "Activities") {
          return (
            <Collapsible
              key={item.title}
              defaultOpen
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
                    <Collapsible className="mb-2">
                      <div className="p-2 bg-emerald-50/70 rounded-md border border-emerald-100">
                        <CollapsibleTrigger className="w-full">
                          <h4 className="text-xs font-medium text-emerald-800 flex items-center justify-between cursor-pointer hover:text-emerald-700">
                            <span className="flex items-center">
                              <FolderPlus className="h-3 w-3 mr-1" /> Add New
                              Activity
                            </span>
                            <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </h4>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-2">
                          <ActivityForm />
                        </CollapsibleContent>
                      </div>
                    </Collapsible>

                    {activities.length > 0 && (
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuSub>
                            {activities.map((activity) => {
                              const isActive = activeActivityId === activity.id;
                              return (
                                <SidebarMenuSubItem key={activity.id}>
                                  <SidebarMenuSubButton
                                    isActive={isActive}
                                    className={cn(
                                      "flex w-full justify-between transition-colors h-11",
                                      isActive
                                        ? "bg-emerald-100 text-emerald-900 font-medium"
                                        : "",
                                      !isActive &&
                                        "hover:bg-emerald-50 hover:text-emerald-700"
                                    )}
                                    onClick={() =>
                                      handleActivityClick(activity.id)
                                    }
                                  >
                                    <div className="flex flex-col items-start">
                                      <span>{activity.title}</span>
                                      <span className="text-xs text-muted-foreground">
                                        {format(
                                          new Date(activity.date),
                                          "MMM d, yyyy"
                                        )}
                                      </span>
                                    </div>
                                    {isActive && (
                                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                    )}
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    )}
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        }

        // Regular section handling
        return (
          <Collapsible
            key={item.title}
            defaultOpen={item.items.some((subItem) => subItem.isActive)}
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
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              isActive={subItem.isActive}
                              className={cn(
                                "flex w-full justify-between transition-colors",
                                subItem.isActive &&
                                  "bg-emerald-100 text-emerald-900 font-medium",
                                !subItem.isActive &&
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
                              {subItem.isActive && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                              )}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        );
      })}
    </>
  );
}
