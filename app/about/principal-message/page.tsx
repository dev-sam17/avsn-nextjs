import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const principal = await prisma.faculty.findFirst({
    where: {
      designation: "Principal", // Replace with the actual ID of your principal message
    },
  });

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 bg-teal-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-700">
          Message from the Principal
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
        {principal ? (
          <Image
            src={principal?.imageUrl as string}
            alt=""
            width={160}
            height={160}
            className="rounded-full"
          />
        ) : (
          <div className="w-40 h-40 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center text-gray-500">
            [Image Placeholder]
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            {principal?.name}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Principal, AV School Of Nursing
          </p>
          <p className="text-gray-700 leading-relaxed">
            Welcome to AV School Of Nursing, where we strive to provide holistic
            nursing education rooted in compassion, ethics, and scientific
            excellence. Our aim is to produce competent healthcare professionals
            who can serve society with skill and empathy. I invite you to be a
            part of our growing legacy.
          </p>
        </div>
      </div>

      <div className="bg-teal-100 rounded-lg p-6 text-center">
        <p className="text-lg text-gray-700 italic">
          “Education is not just about acquiring knowledge; it&apos;s about
          building character, developing empathy, and transforming society.”
        </p>
      </div>
    </section>
  );
}
