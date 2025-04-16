"use client";

import * as React from "react";
import { X, Upload, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ImagePanelProps {
  isOpen: boolean;
  sectionId: string;
  sectionTitle: string;
  onClose: () => void;
}

export function ImagePanel({
  isOpen,
  sectionId,
  sectionTitle,
  onClose,
}: ImagePanelProps) {
  const { toast } = useToast();
  const [images, setImages] = React.useState<{ id: string; url: string }[]>([
    { id: "1", url: "/placeholder.svg?height=200&width=300" },
    { id: "2", url: "/placeholder.svg?height=200&width=300" },
  ]);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // Simulate API call for image upload
    setTimeout(() => {
      const newImages = Array.from(files).map((_, index) => ({
        id: `new-${Date.now()}-${index}`,
        url: "/placeholder.svg?height=200&width=300",
      }));

      setImages([...images, ...newImages]);
      setIsUploading(false);

      toast({
        title: "Images uploaded",
        description: `${files.length} image(s) uploaded successfully.`,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 1500);
  };

  const handleDeleteImage = async (id: string) => {
    // Simulate API call for image deletion
    setTimeout(() => {
      setImages(images.filter((img) => img.id !== id));

      toast({
        title: "Image deleted",
        description: "The image has been removed successfully.",
      });
    }, 500);
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-md transform border-l bg-background p-6 shadow-lg transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{sectionTitle} Images</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="size-5" />
          <span className="sr-only">Close panel</span>
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="mb-6">
        <Label htmlFor="image-upload" className="block mb-2">
          Upload Images
        </Label>
        <div className="flex gap-2">
          <Input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="flex-1"
          />
          <Button disabled={isUploading}>
            {isUploading ? (
              <span className="flex items-center gap-1">
                <span className="animate-spin">⏳</span> Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Upload className="size-4" /> Upload
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Current Images</h3>

        {images.length === 0 ? (
          <p className="text-muted-foreground text-sm">No images available</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image) => (
              <div
                key={image.id + sectionId}
                className="group relative rounded-md border overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={`Image ${image.id}`}
                  className="h-40 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 className="size-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
