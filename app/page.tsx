import CarouselBody from "./ui/home/carousels";
import { NewsColumn } from "./ui/home/newsColumn";
import { MapLocation } from "./ui/home/maps";
import { MarqueeEffectDoubleExample } from "./ui/home/marquee";
import { TotalCount } from "./ui/home/detailsCount";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AV School of Nursing - Top Nursing College in India",
  description:
    "Join AV School of Nursing — premier nursing institute offering BSc Nursing, GNM & ANM courses with accredited faculty and world-class infrastructure.",
  openGraph: {
    title: "AV School of Nursing - Top Nursing College in India",
    description:
      "Explore accredited BSc Nursing, GNM & ANM programs at AV School of Nursing.",
    url: "https://www.avschoolofnursing.in",
    siteName: "AV School of Nursing",
    images: [
      {
        url: "https://www.avschoolofnursing.in/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AV School of Nursing",
    description:
      "Leading nursing college in India. Apply now for BSc, GNM, ANM courses.",
    images: ["https://www.avschoolofnursing.in/og-image.jpg"],
  },
};

const details = {
  openedIn: 2020,
  students: 400,
  faculty: 25,
};

export default async function Home() {
  const notices = await prisma.notice.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const importantNotice = notices.filter((notice) => notice.isImportant);
  const normalNotices = notices.filter((notice) => !notice.isImportant);
  return (
    <>
      <CarouselBody />
      {importantNotice.length > 0 && (
        <MarqueeEffectDoubleExample content={importantNotice[0]} />
      )}
      <div className="flex flex-col md:flex-row items-center bg-teal-50">
        <NewsColumn notices={normalNotices} />
        <MapLocation />
      </div>
      {/* <MessageBar /> */}
      <TotalCount {...details} />
    </>
  );
}
