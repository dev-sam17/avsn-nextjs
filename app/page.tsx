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

export default async function Home() {
  let data;
  try {
    data = await getImagesByFolderName("home-carousel");
  } catch (error) {
    console.log("Error fetching images:", error);
  }

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
