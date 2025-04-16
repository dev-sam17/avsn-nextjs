"use client"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useContentContext } from "@/hooks/use-content-context"

interface NavMainProps {
  items: {
    title: string
    url: string
    items: {
      title: string
      url: string
      id: string
      isActive?: boolean
    }[]
  }[]
}

export function NavMain({ items }: NavMainProps) {
  const { setActiveSection } = useContentContext()

  const handleSectionClick = (sectionId: string, sectionTitle: string, pageTitle: string) => {
    setActiveSection({
      id: sectionId,
      title: sectionTitle,
      pageTitle: pageTitle,
    })
  }

  return (
    <>
      {items.map((item) => (
        <Collapsible key={item.title} defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                {item.title}
                <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
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
                            className={cn("flex w-full justify-between", subItem.isActive && "font-medium")}
                            onClick={() => handleSectionClick(subItem.id, subItem.title, item.title)}
                          >
                            {subItem.title}
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
      ))}
    </>
  )
}

