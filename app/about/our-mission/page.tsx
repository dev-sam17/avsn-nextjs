import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Mission - AV School of Nursing",
  description:
    "Empowering future healthcare leaders with compassion, excellence, and integrity. Learn our mission at AV School of Nursing.",
  openGraph: {
    title: "Our Mission - AV School of Nursing",
    description:
      "Know the mission that drives AV School of Nursing to create skilled nursing professionals.",
    url: "https://www.avschoolofnursing.in/about/our-mission",
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
    title: "Our Mission - AV School of Nursing",
    description:
      "Discover our mission of excellence in nursing education and care.",
    images: ["https://www.avschoolofnursing.in/og-image.jpg"],
  },
};

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-teal-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">Our Mission</h1>
        <p className="mt-2 text-lg text-gray-600">
          Shaping the Future of Healthcare, One Student at a Time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Educate with Excellence
          </h3>
          <p className="text-gray-700">
            Deliver comprehensive and value-based nursing education using
            innovative and practical learning approaches.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Empower Future Nurses
          </h3>
          <p className="text-gray-700">
            Instill leadership, critical thinking, and empathy to empower
            students to become responsible healthcare providers.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Promote Ethical Practice
          </h3>
          <p className="text-gray-700">
            Foster a sense of integrity, dedication, and ethics in patient care
            across all communities.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Contribute to Society
          </h3>
          <p className="text-gray-700">
            Encourage community involvement and public health service as a
            foundation for social responsibility.
          </p>
        </div>
      </div>
    </section>
  );
}
