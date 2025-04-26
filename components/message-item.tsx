"use client"

import { useState } from "react"
import { format } from "date-fns"
import type { Message } from "@/lib/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreVertical, Trash, Archive, RefreshCw, Check, ChevronDown, ChevronUp } from "lucide-react"
import { markAsRead, markAsUnread, archiveMessage, deleteMessage } from "@/lib/actions/message"

interface MessageItemProps {
  message: Message
  onUpdate: () => Promise<void>
  isSelecting: boolean
  isSelected: boolean
  onToggleSelect: () => void
}

export function MessageItem({ message, onUpdate, isSelecting, isSelected, onToggleSelect }: MessageItemProps) {
  const [expanded, setExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleMarkAsRead = async () => {
    setIsLoading(true)
    try {
      await markAsRead(message.id)
      await onUpdate()
    } catch (error) {
      console.error("Failed to mark as read:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsUnread = async () => {
    setIsLoading(true)
    try {
      await markAsUnread(message.id)
      await onUpdate()
    } catch (error) {
      console.error("Failed to mark as unread:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArchive = async () => {
    setIsLoading(true)
    try {
      await archiveMessage(message.id)
      await onUpdate()
    } catch (error) {
      console.error("Failed to archive message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this message?")) return

    setIsLoading(true)
    try {
      await deleteMessage(message.id)
      await onUpdate()
    } catch (error) {
      console.error("Failed to delete message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`p-4 transition-colors ${
        message.read ? "bg-white dark:bg-gray-800" : "bg-emerald-50 dark:bg-emerald-900/20"
      } ${isSelected ? "bg-emerald-100 dark:bg-emerald-900/30" : ""}`}
    >
      <div className="flex items-start">
        {isSelecting && (
          <div className="mr-3 pt-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onToggleSelect}
              className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <h3 className="font-medium truncate mr-2">
                {message.firstName} {message.lastName}
              </h3>
              {!message.read && <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full"></span>}
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {format(new Date(message.createdAt), "MMM d, yyyy")}
              </span>

              {!isSelecting && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {message.read ? (
                      <DropdownMenuItem onClick={handleMarkAsUnread}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Mark as unread
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={handleMarkAsRead}>
                        <Check className="h-4 w-4 mr-2" />
                        Mark as read
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleArchive}>
                      <Archive className="h-4 w-4 mr-2" />
                      {message.archived ? "Unarchive" : "Archive"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="text-red-500 hover:text-red-700 focus:text-red-700"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span className="truncate">{message.email}</span>
            {message.phone && <span className="ml-2 truncate">• {message.phone}</span>}
          </div>

          <div className="relative">
            <p className={`text-sm text-gray-700 dark:text-gray-200 ${!expanded && "line-clamp-2"}`}>
              {message.message}
            </p>
            {message.message.length > 120 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-emerald-600 hover:text-emerald-700 p-0 h-auto mt-1"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" /> Read more
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}
    </div>
  )
}
