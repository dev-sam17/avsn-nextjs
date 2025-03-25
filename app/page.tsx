import CarouselBody from "./ui/home/carousels";
import { getCldImageUrl } from "next-cloudinary";
import { NewsColumn } from "./ui/home/newsColumn";
import { MapLocation } from "./ui/home/maps";
import { MarqueeEffectDoubleExample } from "./ui/home/marquee";
import { TotalCount } from "./ui/home/detailsCount";

const images = ["samples/balloons", "samples/cloudinary-group"];
const imagesUrl = images.map((id) =>
  getCldImageUrl({
    src: id,
  })
);

const details = {
  openedIn: 2020,
  students: 100,
  faculty: 50,
};

export default function Home() {
  return (
    <>
      <CarouselBody images={imagesUrl} />
      <MarqueeEffectDoubleExample />
      <div className="flex flex-col md:flex-row items-center bg-gray-100">
        <NewsColumn />
        <MapLocation />
      </div>
      {/* <MessageBar /> */}
      <TotalCount {...details} />
    </>
  );
}
