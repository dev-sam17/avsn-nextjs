"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createFaculty, updateFaculty } from "@/lib/actions/faculty";
import { Prisma } from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  designation: z.string().min(2, {
    message: "Designation is required.",
  }),
  department: z.string().optional(),
  qualification: z.string().min(2, {
    message: "Qualification is required.",
  }),
  experience: z.coerce.number().int().nonnegative().optional(),
  imageUrl: z.string().optional(),
});

type Faculty = Prisma.Faculty;

interface FacultyFormProps {
  faculty?: Faculty;
}

export default function FacultyForm({ faculty }: FacultyFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    faculty?.imageUrl || null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: faculty?.name || "",
      designation: faculty?.designation || "",
      department: faculty?.department || "",
      qualification: faculty?.qualification || "",
      experience: faculty?.experience || 1,
      imageUrl: faculty?.imageUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      if (faculty) {
        await updateFaculty(faculty.id, values);
      } else {
        await createFaculty({
          ...values,
          department: values.department ?? null,
          experience: values.experience ?? null,
          imageUrl: values.imageUrl ?? null,
        });
      }
      router.push("/admin/faculty");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const response = await uploadImageToCloudinary(file, "faculty");
      const url: string = response?.result?.secure_url;
      setImagePreview(url);
      form.setValue("imageUrl", url);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    form.setValue("imageUrl", "");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Assistant Professor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science" {...field} />
                  </FormControl>
                  <FormDescription>Department is optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification</FormLabel>
                  <FormControl>
                    <Input placeholder="Ph.D. in Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience (years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5" {...field} />
                  </FormControl>
                  <FormDescription>
                    Experience in years (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <div className="flex flex-col gap-4">
                    {imagePreview ? (
                      <div className="relative w-32 h-32 rounded-md overflow-hidden border">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Profile preview"
                          fill
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={clearImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-32 h-32 rounded-md border border-dashed border-muted-foreground">
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground mt-2">
                            Upload
                          </span>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    )}
                    <input type="hidden" {...field} />
                  </div>
                  <FormDescription>
                    Upload a profile image (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/faculty")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                {faculty ? "Updating..." : "Creating..."}
              </>
            ) : faculty ? (
              "Update Faculty"
            ) : (
              "Create Faculty"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
