import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DisplayImage from "@/public/dp-placeholder.jpg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Faculty - AV School of Nursing",
  description:
    "Meet the experienced and qualified faculty shaping future nurses at AV School of Nursing.",
  openGraph: {
    title: "Our Faculty - AV School of Nursing",
    description:
      "Know about our expert and dedicated teaching faculty at AV School of Nursing.",
    url: "https://www.avschoolofnursing.in/campus/faculty",
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
    title: "Our Faculty - AV School of Nursing",
    description: "Learn about the faculty guiding and mentoring our students.",
    images: ["https://www.avschoolofnursing.in/og-image.jpg"],
  },
};

export default async function Page() {
  const faculties = await prisma.faculty.findMany();
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">Our Faculty</h1>
        <p className="mt-2 text-lg text-gray-600">
          Experienced, Empathetic, and Empowering Educators
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* <!-- Faculty Card --> */}
        {faculties.map((faculty) => {
          return (
            <div
              key={faculty.id}
              className="bg-white rounded-lg shadow-md p-4 text-center"
            >
              {faculty.imageUrl ? (
                <Image
                  src={faculty.imageUrl}
                  alt="Faculty Image"
                  width={128}
                  height={128}
                  className="rounded-full mb-4 mx-auto"
                />
              ) : (
                <Image
                  src={DisplayImage}
                  alt="Faculty Image"
                  width={128}
                  height={128}
                  className="rounded-full mb-4 mx-auto"
                />
              )}
              <h3 className="text-xl font-semibold text-teal-700">
                {faculty.name}
              </h3>
              <p className="text-gray-600">
                {faculty.designation} - {faculty.department}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {faculty.qualification} | {faculty.experience}+ years experience
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
