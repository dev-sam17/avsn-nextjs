"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ImageManager } from "@/components/image-manager";
import {
  ContentProvider,
  useContentContext,
} from "@/hooks/use-content-context";
import { ImageIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import "./sidebar-styles.css";

function MainContent() {
  const { activeSection } = useContentContext();

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-emerald-100 px-4 bg-gradient-to-r from-emerald-50/50 to-transparent">
        <SidebarTrigger className="-ml-1 hover:bg-emerald-100 text-emerald-700" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-emerald-200" />
        {activeSection && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {activeSection.pageTitle}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-emerald-400" />
              <BreadcrumbItem>
                <BreadcrumbPage>{activeSection.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </header>
      <div className="flex-1 overflow-auto p-6 bg-gradient-to-b from-white to-emerald-50/30">
        {activeSection ? (
          <ImageManager
            sectionId={activeSection.id}
            sectionTitle={activeSection.title}
            pageTitle={activeSection.pageTitle}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center p-8 rounded-lg border border-dashed border-emerald-200 bg-emerald-50/50">
              <div className="rounded-full bg-emerald-100 p-3 inline-flex mb-3">
                <ImageIcon className="h-6 w-6 text-emerald-500" />
              </div>
              <p className="text-emerald-800 font-medium">
                Select a section from the sidebar
              </p>
              <p className="text-sm text-emerald-600 mt-1">
                Choose a section to manage its images
              </p>
            </div>
          </div>
        )}
      </div>
    </SidebarInset>
  );
}

export default function Page() {
  return (
    <ContentProvider>
      <SidebarProvider>
        <AppSidebar />
        <MainContent />
      </SidebarProvider>
    </ContentProvider>
  );
}
