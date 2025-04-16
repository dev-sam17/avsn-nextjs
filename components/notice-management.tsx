"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import NoticeList from "./notice-list"
import NoticeForm from "./notice-form"
import type { Notice } from "@/types/notice"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function NoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "alphabetical">("newest")

  // Load notices from localStorage on component mount
  useEffect(() => {
    const savedNotices = localStorage.getItem("notices")
    if (savedNotices) {
      setNotices(JSON.parse(savedNotices))
    } else {
      // Add sample notices if none exist
      const sampleNotices: Notice[] = [
        {
          id: "1",
          title: "Welcome to NoticeHub",
          content:
            "This is a platform for managing important notices and communications. You can add, edit, and delete notices, as well as attach PDF documents to them.",
          pdfUrl: null,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "System Maintenance",
          content:
            "The system will be undergoing maintenance this weekend. Please save your work before Friday evening.",
          pdfUrl: null,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
      ]
      setNotices(sampleNotices)
      localStorage.setItem("notices", JSON.stringify(sampleNotices))
    }
  }, [])

  // Save notices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices))
  }, [notices])

  const handleAddNotice = () => {
    setEditingNotice(null)
    setIsFormOpen(true)
  }

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice)
    setIsFormOpen(true)
  }

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter((notice) => notice.id !== id))
  }

  const handleSaveNotice = (notice: Notice) => {
    if (editingNotice) {
      // Update existing notice
      setNotices(notices.map((n) => (n.id === notice.id ? notice : n)))
    } else {
      // Add new notice
      setNotices([notice, ...notices])
    }
    setIsFormOpen(false)
  }

  const handleCancelForm = () => {
    setIsFormOpen(false)
    setEditingNotice(null)
  }

  // Filter and sort notices
  const filteredAndSortedNotices = [...notices]
    .filter(
      (notice) =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortOrder === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:max-w-md">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value as "newest" | "oldest" | "alphabetical")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddNotice} className="bg-emerald-600 hover:bg-emerald-700 ml-2">
            <Plus className="mr-2 h-4 w-4" /> Add Notice
          </Button>
        </div>
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <NoticeForm notice={editingNotice} onSave={handleSaveNotice} onCancel={handleCancelForm} />
        </div>
      ) : (
        <NoticeList notices={filteredAndSortedNotices} onEdit={handleEditNotice} onDelete={handleDeleteNotice} />
      )}
    </div>
  )
}

