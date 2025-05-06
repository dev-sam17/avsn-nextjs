import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GNM Nursing Course - AV School of Nursing",
  description:
    "Enroll in General Nursing and Midwifery (GNM) course with comprehensive nursing education at AV School of Nursing.",
  openGraph: {
    title: "GNM Nursing Course - AV School of Nursing",
    description:
      "Join our GNM program to build a strong nursing foundation with clinical exposure.",
    url: "https://www.avschoolofnursing.in/courses/gnm",
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
    title: "GNM Nursing Course - AV School of Nursing",
    description:
      "Apply now for GNM nursing course with practical training and expert guidance.",
    images: ["https://www.avschoolofnursing.in/og-image.jpg"],
  },
};

export default function Page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* <!-- Header --> */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">
          GNM - General Nursing and Midwifery
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Build a Strong Foundation in Professional Nursing
        </p>
      </div>

      {/* <!-- Image Placeholder --> */}
      <div className="w-full h-64 bg-gray-300 rounded-lg mb-8 flex items-center justify-center text-gray-500 text-lg">
        [Image Placeholder – GNM Training Session]
      </div>

      {/* <!-- Course Overview --> */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Course Overview
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The GNM (General Nursing and Midwifery) course is a diploma program
          that trains students to become skilled nursing professionals capable
          of delivering quality care in hospitals, clinics, and communities. The
          curriculum covers general healthcare, midwifery, medical-surgical
          nursing, pediatric nursing, and psychiatric nursing.
        </p>
      </div>

      {/* <!-- Image Placeholder --> */}
      <div className="w-full h-64 bg-gray-300 rounded-lg mb-8 flex items-center justify-center text-gray-500 text-lg">
        [Image Placeholder – Clinical Posting or Lab Practice]
      </div>

      {/* <!-- Course Details --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">Duration</h3>
          <p className="text-gray-700">
            3 Years (including 6 months internship)
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Eligibility
          </h3>
          <p className="text-gray-700">
            Candidates must have completed 10+2 with a minimum of 40% marks in
            any stream. Science students are preferred. The minimum age is 17
            years.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Admission Process
          </h3>
          <p className="text-gray-700">
            Admission is offered on merit and interview basis. Applicants may
            also be required to pass a basic aptitude test.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Affiliation
          </h3>
          <p className="text-gray-700">
            Recognized by Indian Nursing Council (INC), New Delhi and affiliated
            to [State Nursing Council].
          </p>
        </div>
      </div>

      {/* <!-- Career Opportunities --> */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Career Opportunities
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Staff Nurse in hospitals (public/private)</li>
          <li>Clinical Nurse Specialist</li>
          <li>Midwife in maternity hospitals</li>
          <li>Community Health Nurse</li>
          <li>ICU/Emergency Ward Nurse</li>
          <li>Further studies: B.Sc. Nursing (Post Basic)</li>
        </ul>
      </div>

      {/* <!-- Call to Action --> */}
      {/* <div className="bg-teal-100 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-teal-700 mb-2">
          Shape your future in professional nursing!
        </h3>
        <p className="mb-4 text-gray-700">
          Enroll in our GNM program and start your journey as a healthcare hero.
        </p>
        <a
          href="#"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-800 transition"
        >
          Apply Now
        </a>
      </div> */}
    </section>
  );
}
