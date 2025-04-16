"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, FileText, MoreVertical, Trash, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Notice } from "@/types/notice";
import PdfPreview from "./pdf-preview";

interface NoticeListProps {
  notices: Notice[];
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
}

export default function NoticeList({
  notices,
  onEdit,
  onDelete,
}: NoticeListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewNotice, setPreviewNotice] = useState<Notice | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handlePreview = (notice: Notice) => {
    setPreviewNotice(notice);
  };

  const closePreview = () => {
    setPreviewNotice(null);
  };

  return (
    <div className="space-y-4">
      {notices.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-white">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-slate-100">
              <FileText className="h-6 w-6 text-slate-400" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-slate-900">
            No notices found
          </h3>
          <p className="text-slate-500 mt-1">
            Create your first notice by clicking the &quot;Add Notice&quot;
            button.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notices.map((notice) => (
            <Card
              key={notice.id}
              className="relative overflow-hidden border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-slate-800">
                      {notice.title}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-slate-400" />
                      Posted on {formatDate(notice.createdAt)}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-500 hover:text-slate-900"
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onEdit(notice)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(notice.id)}
                        className="text-destructive cursor-pointer"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4 whitespace-pre-line">
                  {notice.content}
                </p>
                {notice.pdfUrl && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 cursor-pointer hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => handlePreview(notice)}
                  >
                    <FileText className="h-3 w-3" />
                    View PDF
                  </Badge>
                )}
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground pt-0">
                {notice.updatedAt && notice.updatedAt !== notice.createdAt && (
                  <span className="text-xs text-slate-400">
                    Last updated: {formatDate(notice.updatedAt)}
                  </span>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => deleteId && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              notice and any associated PDF files.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* PDF Preview Dialog */}
      {previewNotice && (
        <PdfPreview
          notice={previewNotice}
          onClose={closePreview}
          onDelete={() => {
            const updatedNotice = { ...previewNotice, pdfUrl: null };
            onEdit(updatedNotice);
            closePreview();
          }}
        />
      )}
    </div>
  );
}
