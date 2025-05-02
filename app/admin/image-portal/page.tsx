"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { ImageManager } from "@/components/image-manager";
import { ActivityUploadPanel } from "@/components/activity-upload-panel";
import { Toaster } from "@/components/ui/toaster";
import {
  ContentProvider,
  useContentContext,
} from "@/hooks/use-content-context";
import { ActivitiesProvider, useActivities } from "@/hooks/use-activities";
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

// Add this at the top of the file, after the imports
import "./sidebar-styles.css";
import { useEffect } from "react";

function MainContent() {
  const { activeSection } = useContentContext();
  const { activeActivityId } = useActivities();

  // Determine what content to show based on active section or activity
  const renderContent = () => {
    // If there's an active activity, show the activity upload panel
    if (activeActivityId) {
      return <ActivityUploadPanel activityId={activeActivityId} />;
    }

    // If there's an active section, show the image manager
    if (activeSection && !activeSection.id.startsWith("activity-")) {
      return (
        <ImageManager
          sectionId={activeSection.id}
          sectionTitle={activeSection.title}
          pageTitle={activeSection.pageTitle}
        />
      );
    }

    // Default empty state
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center p-8 rounded-lg border border-dashed border-emerald-200 bg-emerald-50/50">
          <div className="rounded-full bg-emerald-100 p-3 inline-flex mb-3">
            <ImageIcon className="h-6 w-6 text-emerald-500" />
          </div>
          <p className="text-emerald-800 font-medium">
            Select a section from the sidebar
          </p>
          <p className="text-sm text-emerald-600 mt-1">
            Choose a section or activity to manage its images
          </p>
        </div>
      </div>
    );
  };

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
                <BreadcrumbPage className="font-medium text-emerald-800">
                  {activeSection.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </header>
      <div className="flex-1 overflow-auto p-6 bg-gradient-to-b from-white to-emerald-50/30">
        {renderContent()}
      </div>
    </SidebarInset>
  );
}

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  return (
    <ActivitiesProvider>
      <ContentProvider>
        <SidebarProvider>
          <AppSidebar className="mobile-sidebar-fix" />
          <MainContent />
          <Toaster />
        </SidebarProvider>
      </ContentProvider>
    </ActivitiesProvider>
  );
}
