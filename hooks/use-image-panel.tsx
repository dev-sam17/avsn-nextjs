"use client"

import * as React from "react"

type ImagePanelContextType = {
  isOpen: boolean
  sectionId: string
  sectionTitle: string
  openPanel: (id: string, title: string) => void
  closePanel: () => void
}

const ImagePanelContext = React.createContext<ImagePanelContextType | undefined>(undefined)

export function ImagePanelProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [sectionId, setSectionId] = React.useState("")
  const [sectionTitle, setSectionTitle] = React.useState("")

  const openPanel = React.useCallback((id: string, title: string) => {
    setSectionId(id)
    setSectionTitle(title)
    setIsOpen(true)
  }, [])

  const closePanel = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = React.useMemo(
    () => ({
      isOpen,
      sectionId,
      sectionTitle,
      openPanel,
      closePanel,
    }),
    [isOpen, sectionId, sectionTitle, openPanel, closePanel],
  )

  return <ImagePanelContext.Provider value={value}>{children}</ImagePanelContext.Provider>
}

export function useImagePanel() {
  const context = React.useContext(ImagePanelContext)

  if (context === undefined) {
    throw new Error("useImagePanel must be used within an ImagePanelProvider")
  }

  return context
}

