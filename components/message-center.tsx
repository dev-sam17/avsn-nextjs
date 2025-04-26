"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageList } from "@/components/message-list";
import { fetchMessages } from "@/lib/actions/message";
import type { Message } from "@/lib/types";
import Link from "next/link";
import { LogoutButton } from "./auth/logout-button";

export function MessageCenter() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("unread");

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        const data = await fetchMessages(filter);
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [filter]);

  const handleMessageUpdate = async () => {
    const data = await fetchMessages(filter);
    setMessages(data);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <header className="flex items-center justify-between mb-6 sticky top-0 bg-white dark:bg-gray-900 py-4 z-10 border-b">
        <div className="flex items-center">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Message Center</h1>
        </div>
        <div className="flex items-center space-x-2">
          <LogoutButton />
        </div>
      </header>

      <div className="mb-6">
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all" ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }
          >
            All Messages
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            onClick={() => setFilter("unread")}
            className={
              filter === "unread" ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }
          >
            Unread
          </Button>
          <Button
            variant={filter === "archived" ? "default" : "outline"}
            onClick={() => setFilter("archived")}
            className={
              filter === "archived" ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }
          >
            Archived
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <MessageList messages={messages} onUpdate={handleMessageUpdate} />
      )}
    </div>
  );
}
