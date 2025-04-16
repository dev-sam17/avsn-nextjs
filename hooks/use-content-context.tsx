"use client";

import * as React from "react";

type SectionInfo = {
  id: string;
  title: string;
  pageTitle: string;
};

type ContentContextType = {
  activeSection: SectionInfo | null;
  setActiveSection: (section: SectionInfo) => void;
};

const ContentContext = React.createContext<ContentContextType | undefined>(
  undefined
);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = React.useState<SectionInfo | null>({
    id: "home-carousel",
    title: "Carousel",
    pageTitle: "Home",
  });

  const value = React.useMemo(
    () => ({
      activeSection,
      setActiveSection,
    }),
    [activeSection]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContentContext() {
  const context = React.useContext(ContentContext);

  if (context === undefined) {
    throw new Error("useContentContext must be used within a ContentProvider");
  }

  return context;
}
