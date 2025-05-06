import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hostel Facilities - AV School of Nursing",
  description:
    "Safe, comfortable hostel accommodation with modern amenities for students at AV School of Nursing.",
  openGraph: {
    title: "Hostel Facilities - AV School of Nursing",
    description:
      "Explore hostel life and student accommodation at AV School of Nursing.",
    url: "https://www.avschoolofnursing.in/campus/hostel",
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
    title: "Hostel Facilities - AV School of Nursing",
    description: "Discover safe and comfortable hostel amenities for students.",
    images: ["https://www.avschoolofnursing.in/og-image.jpg"],
  },
};

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">Hostel Facilities</h1>
        <p className="mt-2 text-lg text-gray-600">
          Safe, Hygienic, and Comfortable Accommodation
        </p>
      </div>

      <div className="w-full h-64 bg-gray-300 rounded-lg mb-8 flex items-center justify-center text-gray-500 text-lg">
        [Image Placeholder – Hostel Exterior]
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Overview</h2>
        <p className="text-gray-700">
          Our college provides well-maintained hostel facilities for both boys
          and girls. Equipped with modern amenities, strict security, and
          nutritious food, the hostel ensures a safe and homely environment for
          all students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Room Types
          </h3>
          <p className="text-gray-700">
            2-sharing and 3-sharing rooms with attached bathrooms.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Amenities
          </h3>
          <p className="text-gray-700">
            Wi-Fi, common study areas, laundry, RO water, solar heating.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">Security</h3>
          <p className="text-gray-700">
            24x7 surveillance, biometric entry, wardens on duty.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">Dining</h3>
          <p className="text-gray-700">
            In-house hygienic mess offering vegetarian meals.
          </p>
        </div>
      </div>

      {/* <div className="bg-teal-100 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-teal-700 mb-2">
          Apply for Hostel
        </h3>
        <p className="mb-4 text-gray-700">
          Book your hostel room after admission confirmation.
        </p>
        <a
          href="/hostel-application"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-800"
        >
          Apply Now
        </a>
      </div> */}
    </section>
  );
}
