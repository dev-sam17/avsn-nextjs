"use client";

import * as React from "react";
import { Upload, Trash2, RefreshCw, ImagePlus, ImageIcon } from "lucide-react";

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
        className: "bg-emerald-50 border-emerald-200",
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
          <h1 className="text-2xl font-bold tracking-tight text-emerald-900">
            {sectionTitle}
          </h1>
          <p className="text-emerald-600">{pageTitle} section</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadImages}
          disabled={isLoading}
          className="border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${
              isLoading ? "animate-spin text-emerald-500" : "text-emerald-500"
            }`}
          />
        </Button>
      </div>

      <Separator className="my-6 bg-emerald-100" />
      <Card className="border-emerald-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100">
          <CardTitle className="text-emerald-800 flex items-center gap-2">
            <ImagePlus className="h-5 w-5 text-emerald-500" />
            Upload Images
          </CardTitle>
          <CardDescription>
            Add new images to the {sectionTitle} section. Supported formats:
            JPG, PNG, GIF.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image-upload" className="text-emerald-700">
                Select Images
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    ref={fileInputRef}
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="border-emerald-200 focus-visible:ring-emerald-500 file:bg-emerald-50 file:text-emerald-700 file:border-0 hover:file:bg-emerald-100 transition-colors"
                    disabled={isUploading}
                    onChange={handleFileChange}
                  />
                </div>
                <Button
                  disabled={isUploading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
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

      <Card className="border-emerald-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100">
          <CardTitle className="text-emerald-800 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-emerald-500" />
            Current Images
          </CardTitle>
          <CardDescription>
            Manage existing images for the {sectionTitle} section.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-emerald-50 p-3">
                  <RefreshCw className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
                <p className="text-sm text-emerald-600 font-medium mt-2">
                  Loading images...
                </p>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-emerald-50/50 rounded-lg border border-dashed border-emerald-200">
              <div className="rounded-full bg-emerald-100/80 p-3 mb-3">
                <ImageIcon className="h-8 w-8 text-emerald-500" />
              </div>
              <p className="text-emerald-800 font-medium mb-1">
                No images available
              </p>
              <p className="text-sm text-emerald-600">
                Upload images using the form above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.public_id}
                  className="group relative rounded-lg border border-emerald-100 overflow-hidden bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-square w-full overflow-hidden bg-emerald-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.secure_url || "/placeholder.svg"}
                      alt={`Image for ${sectionTitle}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteImage(image.public_id)}
                      className="translate-y-4 group-hover:translate-y-0 transition-transform duration-200"
                    >
                      <Trash2 className="size-4 mr-1" /> Delete
                    </Button>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      ID: {image.public_id.slice(-4)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-emerald-100 bg-emerald-50/50">
          <p className="text-sm text-emerald-700">
            {images.length} image{images.length !== 1 ? "s" : ""} total
          </p>
          {images.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100"
              onClick={() => {
                loadImages();
              }}
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Refresh
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
