export default function Page() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">Laboratories</h1>
        <p className="mt-2 text-lg text-gray-600">
          Hands-on Learning with Advanced Equipment
        </p>
      </div>

      <div className="w-full h-64 bg-gray-300 rounded-lg mb-8 flex items-center justify-center text-gray-500 text-lg">
        [Image Placeholder – Science or Nursing Lab]
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Overview</h2>
        <p className="text-gray-700">
          The college hosts state-of-the-art laboratories for Anatomy, Nursing
          Foundations, Community Health, Nutrition, and Computer Skills. Labs
          are designed to provide practical exposure in a real-world setting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Nursing Foundation Lab
          </h3>
          <p className="text-gray-700">
            Demonstration beds, dummies, instruments for clinical training.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Community Lab
          </h3>
          <p className="text-gray-700">
            Replicates rural health setups with charts, models, and field kits.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Nutrition Lab
          </h3>
          <p className="text-gray-700">
            Equipped with cooking platforms and nutritional teaching aids.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            Computer Lab
          </h3>
          <p className="text-gray-700">
            Modern PCs with internet access for research and digital skills.
          </p>
        </div>
      </div>
    </section>
  );
}
