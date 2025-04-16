"use client";

import * as React from "react";
import { Upload, Trash2, RefreshCw } from "lucide-react";

import {
  getImagesByFolderName,
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
  type Image,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ImageManagerProps {
  sectionId: string;
  sectionTitle: string;
  pageTitle: string;
}

export function ImageManager({
  sectionId,
  sectionTitle,
  pageTitle,
}: ImageManagerProps) {
  const { toast } = useToast();
  const [images, setImages] = React.useState<Image[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const loadImages = React.useCallback(async () => {
    if (!sectionId) return;

    setIsLoading(true);
    try {
      const data = await getImagesByFolderName(sectionId);
      console.log("Fetched images:", data?.images);
      setImages(data.images);
    } catch (error) {
      console.log("Error loading images:", error);
      toast({
        title: "Error loading images",
        description:
          "There was a problem loading the images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [sectionId, toast]);

  React.useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadImageToCloudinary(file, sectionId)
      );

      await Promise.all(uploadPromises);
      loadImages(); // Reload images after upload

      toast({
        title: "Images uploaded",
        description: `${files.length} image(s) uploaded successfully.`,
      });
    } catch (error) {
      console.log("Error uploading images:", error);
      toast({
        title: "Upload failed",
        description:
          "There was a problem uploading your images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      await deleteImageFromCloudinary(id);
      loadImages(); // Reload images after upload

      toast({
        title: "Image deleted",
        description: "The image has been removed successfully.",
      });
    } catch (error) {
      console.log("Error deleting image:", error);
      toast({
        title: "Delete failed",
        description:
          "There was a problem deleting the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{sectionTitle}</h1>
          <p className="text-muted-foreground">{pageTitle} section</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadImages}
          disabled={isLoading}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>
            Add new images to the {sectionTitle} section. Supported formats:
            JPG, PNG, GIF.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image-upload">Select Images</Label>
              <div className="flex gap-2">
                <Input
                  ref={fileInputRef}
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="flex-1"
                  disabled={isUploading}
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Images</CardTitle>
          <CardDescription>
            Manage existing images for the {sectionTitle} section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Loading images...
                </p>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-2">No images available</p>
              <p className="text-sm text-muted-foreground">
                Upload images using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.public_id}
                  className="group relative rounded-md border overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.secure_url || "/placeholder.svg"}
                    alt={`Image for ${sectionTitle}`}
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteImage(image.public_id)}
                    >
                      <Trash2 className="size-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {images.length} image{images.length !== 1 ? "s" : ""} total
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
