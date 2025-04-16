export default function Page() {
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
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            [Image]
          </div>
          <h3 className="text-xl font-semibold text-teal-700">
            Dr. Meena Sharma
          </h3>
          <p className="text-gray-600">Principal & HOD - Nursing</p>
          <p className="text-sm text-gray-500 mt-1">
            M.Sc Nursing, PhD | 18+ years experience
          </p>
        </div>

        {/* <!-- Copy and update the card below for more faculty --> */}
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            [Image]
          </div>
          <h3 className="text-xl font-semibold text-teal-700">
            Mr. Rajiv Kumar
          </h3>
          <p className="text-gray-600">Lecturer - Community Health</p>
          <p className="text-sm text-gray-500 mt-1">
            B.Sc Nursing, M.Sc Nursing | 10+ years experience
          </p>
        </div>

        {/* <!-- Add more cards as needed --> */}
      </div>
    </section>
  );
}
