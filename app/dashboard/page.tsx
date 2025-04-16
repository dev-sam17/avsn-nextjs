"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ImageManager } from "@/components/image-manager";
import {
  ContentProvider,
  useContentContext,
} from "@/hooks/use-content-context";
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

function MainContent() {
  const { activeSection } = useContentContext();

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {activeSection && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {activeSection.pageTitle}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{activeSection.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </header>
      <div className="flex-1 overflow-auto p-6">
        {activeSection ? (
          <ImageManager
            sectionId={activeSection.id}
            sectionTitle={activeSection.title}
            pageTitle={activeSection.pageTitle}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              Select a section from the sidebar
            </p>
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
