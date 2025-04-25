"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Loader2 } from "lucide-react";
import NoticeList from "./notice-list";
import NoticeForm from "./notice-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Prisma } from "@/lib/prisma";
import {
  getNotices,
  createNotice,
  deleteNotice,
  updateNotice,
} from "@/lib/actions/notice";

type Notice = Prisma.Notice;
type NoticeFormBody = Omit<Notice, "id" | "createdAt">;

export default function NoticeManagement() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<
    "newest" | "oldest" | "alphabetical"
  >("newest");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch notices from the mock database
  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const data = await getNotices();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast({
        title: "Error",
        description: "Failed to load notices. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAddNotice = () => {
    setEditingNotice(null);
    setIsFormOpen(true);
  };

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setIsFormOpen(true);
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      // Show loading toast
      toast({
        title: "Deleting notice...",
        description: (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </div>
        ),
      });

      const success = await deleteNotice(id);

      if (success) {
        setNotices(notices.filter((notice) => notice.id !== id));
        toast({
          title: "Success",
          description: "Notice deleted successfully",
        });
      } else {
        throw new Error("Failed to delete notice");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast({
        title: "Error",
        description: "Failed to delete notice. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveNotice = async (notice: NoticeFormBody) => {
    if (editingNotice) {
      // Update existing notice
      const updatedNotice = await updateNotice(editingNotice.id, notice);
      if (updatedNotice) {
        setNotices(
          notices.map((n) => (n.id === updatedNotice.id ? updatedNotice : n))
        );
        toast({
          title: "Success",
          description: "Notice updated successfully",
        });
      }
    } else {
      // Create new notice
      await createNotice(notice);
      await fetchNotices();
      toast({
        title: "Success",
        description: "Notice created successfully",
      });
    }
    setIsFormOpen(false);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingNotice(null);
  };

  // Filter and sort notices
  const filteredAndSortedNotices = [...notices]
    .filter(
      (notice) =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortOrder === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else {
        return a.title.localeCompare(b.title);
      }
    });

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
            onValueChange={(value) =>
              setSortOrder(value as "newest" | "oldest" | "alphabetical")
            }
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
          <Button
            onClick={handleAddNotice}
            className="bg-emerald-600 hover:bg-emerald-700 ml-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Notice
          </Button>
        </div>
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <NoticeForm
            notice={editingNotice}
            onSave={handleSaveNotice}
            onCancel={handleCancelForm}
          />
        </div>
      ) : (
        <NoticeList
          notices={filteredAndSortedNotices}
          onEdit={handleEditNotice}
          onDelete={handleDeleteNotice}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
