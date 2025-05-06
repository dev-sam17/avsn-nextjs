import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Story - AV School of Nursing",
  description: "Read about the inspiring journey and milestones of AV School of Nursing, empowering healthcare through education.",
  openGraph: {
    title: "Our Story - AV School of Nursing",
    description: "Explore the growth and achievements of AV School of Nursing since inception.",
    url: "https://www.avschoolofnursing.in/about/our-story",
    siteName: "AV School of Nursing",
    images: [{ url: "https://www.avschoolofnursing.in/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story - AV School of Nursing",
    description: "Discover the milestones and achievements of our institution.",
    images: ["https://www.avschoolofnursing.in/og-image.jpg"],
  },
};


export default function Page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-teal-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">Our Story</h1>
        <p className="mt-2 text-lg text-gray-600">
          A Legacy of Care, Compassion & Excellence
        </p>
      </div>

      <div className="w-full h-64 bg-gray-300 rounded-lg mb-8 flex items-center justify-center text-gray-500 text-lg">
        [Image Placeholder – College Founding or Archive Photo]
      </div>

      <div className="text-gray-700 leading-relaxed space-y-4">
        <p>
          Established in 2021, AV School Of Nursing was founded with a vision to
          bring quality nursing education to Jharkhand. What started as a humble
          initiative has now transformed into a reputed institution nurturing
          hundreds of students every year.
        </p>
        <p>
          With a blend of academic excellence, practical exposure, and a
          compassionate approach to patient care, we’ve created a unique
          learning ecosystem. Our alumni today serve across government
          hospitals, private healthcare institutions, NGOs, and global health
          missions.
        </p>
        <p>
          We believe in evolving with time — integrating modern methods of
          teaching, upgrading our labs and library, and fostering an environment
          of mutual respect, discipline, and growth.
        </p>
      </div>
    </section>
  );
}
