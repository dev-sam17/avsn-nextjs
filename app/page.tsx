"use client";
import { useEffect, useState } from "react";
import CarouselBody from "./ui/home/carousels";
import { NewsColumn } from "./ui/home/newsColumn";
import { MapLocation } from "./ui/home/maps";
import { MarqueeEffectDoubleExample } from "./ui/home/marquee";
import { TotalCount } from "./ui/home/detailsCount";
import { getImagesByFolderName } from "@/lib/api";

const details = {
  openedIn: 2020,
  students: 100,
  faculty: 50,
};

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
};

export default function Home() {
  const [data, setData] = useState<{ images: CloudinaryResource[] }>({
    images: [],
  });

  useEffect(() => {
    async function get() {
      try {
        const res = await getImagesByFolderName("home-carousel");
        setData(res);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    }

    get();
  }, []);

  return (
    <>
      <CarouselBody images={data.images} />
      <MarqueeEffectDoubleExample />
      <div className="flex flex-col md:flex-row items-center bg-teal-50">
        <NewsColumn />
        <MapLocation />
      </div>
      {/* <MessageBar /> */}
      <TotalCount {...details} />
    </>
  );
}
