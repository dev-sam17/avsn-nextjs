import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library - AV School of Nursing",
  description:
    "Extensive library resources supporting nursing education and research at AV School of Nursing.",
  openGraph: {
    title: "Library - AV School of Nursing",
    description:
      "Access academic resources, journals, and research materials in our library.",
    url: "https://www.avschoolofnursing.in/campus/library",
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
    title: "Library - AV School of Nursing",
    description: "Explore our nursing library and its resources.",
    images: ["https://www.avschoolofnursing.in/og-image.jpg"],
  },
};

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">Library</h1>
        <p className="mt-2 text-lg text-gray-600">
          Empowering Learning Through Knowledge
        </p>
      </div>

      <div className="w-full h-64 bg-gray-300 rounded-lg mb-8 flex items-center justify-center text-gray-500 text-lg">
        [Image Placeholder – Library Interior]
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Overview</h2>
        <p className="text-gray-700">
          Our well-stocked library supports academic excellence and research
          with thousands of books, journals, digital resources, and a peaceful
          study environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Collection
          </h3>
          <p className="text-gray-700">
            10,000+ books, national & international journals, e-books, reference
            materials.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Digital Access
          </h3>
          <p className="text-gray-700">
            Access to INFLIBNET, DELNET, and online journals via digital library
            section.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">Timings</h3>
          <p className="text-gray-700">Monday to Saturday: 8 AM – 7 PM</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Facilities
          </h3>
          <p className="text-gray-700">
            Quiet reading zones, computer terminals, group study cabins.
          </p>
        </div>
      </div>

      {/* <div className="bg-teal-100 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-teal-700 mb-2">
          Need a Library Card?
        </h3>
        <p className="mb-4 text-gray-700">
          Collect your card from the librarian after registration.
        </p>
        <a
          href="/library-registration"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700"
        >
          Register Now
        </a>
      </div> */}
    </section>
  );
}
