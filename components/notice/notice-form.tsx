"use client";

import type React from "react";
import { type PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, X, Loader2, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Prisma } from "@/lib/prisma";

type Notice = Prisma.Notice;

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isImportant: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;
type NoticeFormBody = Omit<Notice, "id" | "createdAt">;

interface NoticeFormProps {
  notice: Notice | null;
  onSave: (notice: NoticeFormBody) => void;
  onCancel: () => void;
}

export default function NoticeForm({
  notice,
  onSave,
  onCancel,
}: NoticeFormProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(notice?.fileUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [, setBlob] = useState<PutBlobResult | null>(null);

  const { toast } = useToast();

  // Initialize the form with react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: notice?.title || "",
      content: notice?.content || "",
      isImportant: notice?.isImportant || false,
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setPdfFile(file);

        // Simulate file upload with progress
        await uploadFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);

    try {
      const newBlob = await upload(`notice/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/uploads",
      });

      setBlob(newBlob);
      setPdfUrl(newBlob.url);

      // Ensure progress reaches 100%
      setUploadProgress(100);

      toast({
        title: "File uploaded",
        description: "PDF file uploaded successfully",
        action: (
          <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-emerald-600" />
          </div>
        ),
        className: "bg-emerald-50 border-emerald-200",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload PDF file. Please try again.",
        variant: "destructive",
      });
      setPdfFile(null);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setIsUploading(false);
      }, 500); // Small delay to ensure progress animation completes
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfUrl(null);
    toast({
      title: "File removed",
      description: "PDF file has been removed",
      className: "bg-emerald-50 border-emerald-200",
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);

    try {
      const noticeData = { ...data, fileUrl: pdfUrl };

      onSave(noticeData);
    } catch (error) {
      console.error("Error saving notice:", error);
      toast({
        title: "Error",
        description: notice
          ? "Failed to update notice"
          : "Failed to create notice",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter notice title"
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter notice content"
                  className="min-h-[150px] resize-y"
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isImportant"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-2 items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
              </FormControl>
              <FormLabel className="text-sm font-small">
                Mark as Important
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="pdf" className="text-base font-medium">
            PDF Attachment (Optional)
          </Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputFileRef.current?.click()}
              disabled={isUploading}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FileUp className="mr-2 h-4 w-4" />
                  {pdfUrl ? "Change PDF" : "Upload PDF"}
                </>
              )}
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
            ref={inputFileRef}
            type="file"
            id="pdf"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {isUploading && (
            <div className="space-y-2 mt-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Uploading: {Math.round(uploadProgress)}%
              </p>
            </div>
          )}

          {pdfUrl && !isUploading && (
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
          <Button
            type="submit"
            disabled={isSaving || isUploading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {notice ? "Updating..." : "Saving..."}
              </>
            ) : notice ? (
              "Update Notice"
            ) : (
              "Save Notice"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
