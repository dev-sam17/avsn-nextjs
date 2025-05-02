"use client";

import * as React from "react";
import {
  Upload,
  Trash2,
  ImagePlus,
  Calendar,
  RefreshCw,
  TrashIcon,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import {
  getImagesByFolderName,
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "@/lib/api";
import { Image } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useActivities } from "@/hooks/use-activities";

interface ActivityUploadPanelProps {
  activityId: string;
}

export function ActivityUploadPanel({ activityId }: ActivityUploadPanelProps) {
  const { toast } = useToast();
  const { activities, removeActivity } = useActivities();
  const [images, setImages] = React.useState<Image[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const activity = activities.find((a) => a.id === activityId);

  const loadImages = React.useCallback(async () => {
    if (!activity?.sectionId) return;

    setIsLoading(true);
    try {
      const data = await getImagesByFolderName(activity.sectionId);
      setImages(data.images);
    } catch (error) {
      console.error("Error loading images:", error);
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
  }, [activity?.sectionId]);

  React.useEffect(() => {
    if (!activity?.sectionId) return;
    loadImages();
  }, [loadImages, activity?.sectionId]);

  if (!activity) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Activity not found</p>
      </div>
    );
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadImageToCloudinary(file, activity.sectionId)
      );

      await Promise.all(uploadPromises);
      loadImages();

      toast({
        title: "Images uploaded",
        description: `${files.length} image(s) uploaded successfully for ${activity.title}.`,
        className: "bg-emerald-50 border-emerald-200",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          "There was a problem uploading your images. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteImageFromCloudinary(imageId);
      loadImages(); // Reload images after upload

      toast({
        title: "Image deleted",
        description: "The image has been removed successfully.",
        className: "bg-emerald-50 border-emerald-200",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description:
          "There was a problem deleting the image. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };
  const confirmDelete = async () => {
    if (deleteId) {
      setIsDeleting(true);
      await handleDeleteActivity();
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleDeleteActivity = async () => {
    removeActivity(activity.id, activity.sectionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-900">
            {activity.title}
          </h1>
          <p className="text-emerald-600 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(new Date(activity.date), "PPP")}
          </p>
        </div>
        <div>
          {/* // add a delete button with delete icon */}
          <Button
            variant={"destructive"}
            onClick={() => handleDelete(activity.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator className="my-6 bg-emerald-100" />

      <Card className="border-emerald-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100">
          <CardTitle className="text-emerald-800 flex items-center gap-2">
            <ImagePlus className="h-5 w-5 text-emerald-500" />
            Upload Images
          </CardTitle>
          <CardDescription>
            Add new images to the {activity.title}.
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
                    onChange={handleFileChange}
                    className="border-emerald-200 focus-visible:ring-emerald-500 file:bg-emerald-50 file:text-emerald-700 file:border-0 hover:file:bg-emerald-100 transition-colors"
                    disabled={isUploading}
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
          <CardTitle className="text-emerald-800">Activity Images</CardTitle>
          <CardDescription>Manage images for {activity.title}.</CardDescription>
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
                <ImagePlus className="h-8 w-8 text-emerald-500" />
              </div>
              <p className="text-emerald-800 font-medium mb-1">No images yet</p>
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
                      alt={`Image for ${activity.title}`}
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
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-emerald-100 bg-emerald-50/50">
          <p className="text-sm text-emerald-700">
            {images.length} image
            {images.length !== 1 ? "s" : ""} total
          </p>
        </CardFooter>
      </Card>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => deleteId && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              activity and any associated images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
