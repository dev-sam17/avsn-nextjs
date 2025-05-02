"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Image as ImageType } from "@/lib/types";
import { getImagesByFolderName } from "@/lib/api";
import { Skeleton } from "../ui/skeleton";

export function ActivityGallery({ sectionId }: { sectionId: string }) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchImages() {
    try {
      const data = await getImagesByFolderName(sectionId);
      setImages(data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, [sectionId]);

  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: ImageType, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  if (isLoading) return <GallerySkeleton />;

  return (
    <>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.public_id}
            className="relative aspect-square rounded-md overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => openLightbox(image, index)}
          >
            <Image
              src={image.secure_url || "/placeholder.svg"}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.button
              className="absolute top-12 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-60"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </motion.button>

            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </motion.button>

            <motion.div
              className="relative w-full max-w-4xl h-full max-h-[80vh] flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.secure_url || "/placeholder.svg"}
                alt=""
                fill
                sizes="80vw"
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-md" />
      ))}
    </div>
  );
}
