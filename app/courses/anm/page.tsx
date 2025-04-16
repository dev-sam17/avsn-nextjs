export default function Page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* <!-- Header --> */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">
          ANM - Auxiliary Nurse Midwifery
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Empowering Women in Healthcare
        </p>
      </div>

      {/* <!-- Image Placeholder --> */}
      <div className="w-full h-64 bg-gray-300 rounded-lg mb-8 flex items-center justify-center text-gray-500 text-lg">
        [Image Placeholder – ANM Classroom/Hospital Training]
      </div>

      {/* <!-- Course Overview --> */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Course Overview
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The ANM (Auxiliary Nurse Midwifery) course is a diploma program
          focused on the healthcare needs of individuals, families, and
          communities. It trains students in basic nursing care, maternal and
          child health, family planning, and first aid. This course prepares
          candidates to work as frontline healthcare providers in both rural and
          urban areas.
        </p>
      </div>

      {/* <!-- Image Placeholder --> */}
      <div className="w-full h-64 bg-gray-300 rounded-lg mb-8 flex items-center justify-center text-gray-500 text-lg">
        [Image Placeholder – Student Practical Training]
      </div>

      {/* <!-- Course Details --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">Duration</h3>
          <p className="text-gray-700">
            2 Years (including 6 months of internship)
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Eligibility
          </h3>
          <p className="text-gray-700">
            Candidates must have passed 10+2 in Arts or Science stream with at
            least 40% aggregate marks from a recognized board. The minimum age
            is 17 years.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Admission Process
          </h3>
          <p className="text-gray-700">
            Admission is based on merit and personal interview. Limited seats
            available. Apply early to secure your spot.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Affiliation
          </h3>
          <p className="text-gray-700">
            Affiliated to [State Nursing Council] and recognized by Indian
            Nursing Council (INC), New Delhi.
          </p>
        </div>
      </div>

      {/* <!-- Career Opportunities --> */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Career Opportunities
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Community Health Worker</li>
          <li>Auxiliary Nurse Midwife in PHCs and Sub-centres</li>
          <li>Home-based healthcare provider</li>
          <li>Staff Nurse in private and government hospitals</li>
          <li>NGO worker in maternal and child health initiatives</li>
        </ul>
      </div>

      {/* <!-- Call to Action --> */}
      {/* <div className="bg-teal-100 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-teal-700 mb-2">
          Ready to start your journey in nursing?
        </h3>
        <p className="mb-4 text-gray-700">
          Apply now to join our ANM program and make a difference in community
          healthcare.
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
