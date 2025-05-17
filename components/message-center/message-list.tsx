"use client";

import { useState } from "react";
import { MessageItem } from "@/components/message-center/message-item";
import type { Message } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, MoreVertical, Trash, Archive, RefreshCw } from "lucide-react";
import {
  markAsRead,
  markAsUnread,
  archiveMessage,
  deleteMessage,
} from "@/lib/actions/message";

interface MessageListProps {
  messages: Message[];
  onUpdate: () => Promise<void>;
}

export function MessageList({ messages, onUpdate }: MessageListProps) {
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(
    new Set()
  );
  const [isSelecting, setIsSelecting] = useState(false);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMessages(newSelected);
  };

  const handleBulkAction = async (
    action: "read" | "unread" | "archive" | "delete"
  ) => {
    const ids = Array.from(selectedMessages);
    if (ids.length === 0) return;

    try {
      switch (action) {
        case "read":
          await Promise.all(ids.map((id) => markAsRead(id)));
          break;
        case "unread":
          await Promise.all(ids.map((id) => markAsUnread(id)));
          break;
        case "archive":
          await Promise.all(ids.map((id) => archiveMessage(id)));
          break;
        case "delete":
          await Promise.all(ids.map((id) => deleteMessage(id)));
          break;
      }
      await onUpdate();
      setSelectedMessages(new Set());
      setIsSelecting(false);
    } catch (error) {
      console.error(`Failed to perform bulk action ${action}:`, error);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">No messages found</p>
      </div>
    );
  }

  return (
    <div>
      {isSelecting && (
        <div className="sticky top-16 z-10 bg-white dark:bg-gray-900 p-2 mb-4 border-b flex items-center justify-between">
          <div>
            <span className="text-sm font-medium">
              {selectedMessages.size} selected
            </span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction("read")}
              className="text-xs"
            >
              <Check className="h-4 w-4 mr-1" />
              Mark Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction("unread")}
              className="text-xs"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Mark Unread
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction("archive")}
              className="text-xs"
            >
              <Archive className="h-4 w-4 mr-1" />
              Archive
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction("delete")}
              className="text-xs text-red-500 hover:text-red-700"
            >
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsSelecting(false);
                setSelectedMessages(new Set());
              }}
              className="text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!isSelecting && (
          <div className="flex justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSelecting(true)}
              className="text-xs"
            >
              Select Messages
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onUpdate()}>
                  Refresh
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <div className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              onUpdate={onUpdate}
              isSelecting={isSelecting}
              isSelected={selectedMessages.has(message.id)}
              onToggleSelect={() => toggleSelect(message.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
