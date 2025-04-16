"use client"

import type React from "react"

import { useState, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, X } from "lucide-react"
import type { Notice } from "@/types/notice"

interface NoticeFormProps {
  notice: Notice | null
  onSave: (notice: Notice) => void
  onCancel: () => void
}

export default function NoticeForm({ notice, onSave, onCancel }: NoticeFormProps) {
  const [title, setTitle] = useState(notice?.title || "")
  const [content, setContent] = useState(notice?.content || "")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(notice?.pdfUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setPdfFile(file)
        // Create a local URL for preview
        const objectUrl = URL.createObjectURL(file)
        setPdfUrl(objectUrl)
      } else {
        alert("Please select a PDF file")
      }
    }
  }

  const handleRemovePdf = () => {
    setPdfFile(null)
    if (pdfUrl && !notice?.pdfUrl) {
      URL.revokeObjectURL(pdfUrl) // Clean up the object URL
    }
    setPdfUrl(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Please enter a title")
      return
    }

    // In a real application, you would upload the PDF to a server
    // and get back a URL. Here we're simulating that by using the local URL.
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      const savedNotice: Notice = {
        id: notice?.id || uuidv4(),
        title,
        content,
        pdfUrl,
        createdAt: notice?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      onSave(savedNotice)
      setIsUploading(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-base font-medium">
          Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter notice title"
          className="h-11"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content" className="text-base font-medium">
          Content
        </Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter notice content"
          className="min-h-[150px] resize-y"
          rows={5}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pdf" className="text-base font-medium">
          PDF Attachment (Optional)
        </Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <FileUp className="mr-2 h-4 w-4" />
            {pdfUrl ? "Change PDF" : "Upload PDF"}
          </Button>
          {pdfUrl && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemovePdf}
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove PDF</span>
            </Button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          id="pdf"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {pdfUrl && (
          <p className="text-sm text-emerald-600 flex items-center mt-2">
            <FileUp className="h-3.5 w-3.5 mr-1" />
            PDF attached: {pdfFile?.name || "document.pdf"}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading} className="bg-emerald-600 hover:bg-emerald-700">
          {isUploading ? "Saving..." : notice ? "Update Notice" : "Save Notice"}
        </Button>
      </div>
    </form>
  )
}

