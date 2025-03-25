// import Image from "next/image";

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="text-center text-4xl font-bold text-primary p-4">
        Our Mission
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <div className="rounded w-100 h-100 border"></div>
          {/* <Image
            src="https://source.unsplash.com/random"
            alt="Principal"
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="lg:w-1/2 p-4">
          <p>
            At AV Nursing School, our mission is to provide exceptional nursing
            education that empowers students to become skilled, compassionate,
            and dedicated healthcare professionals. We are committed to shaping
            the future of nursing through a comprehensive curriculum, hands-on
            clinical experiences, and a supportive learning environment that
            nurtures both personal and professional growth.
          </p>
          <br />
          <p>Our core values drive everything we do:</p>
          <ul className="list-disc list-inside p-2">
            <li>
              <strong> Academic Excellence:</strong> We strive to provide an
              innovative and evidence-based education, ensuring that our
              students are well-equipped with the latest knowledge and practices
              in nursing care.
            </li>
            <li>
              <strong>Compassionate Care: </strong>We believe that empathy and
              compassion are at the heart of nursing. Our training emphasizes
              not only the technical skills needed in healthcare but also the
              emotional intelligence required to care for patients with dignity
              and respect.
            </li>
            <li>
              <strong>Hands-on Training:</strong> We offer state-of-the-art
              clinical training and real-world experiences to ensure that our
              students are fully prepared for the challenges of modern
              healthcare environments.
            </li>
            <li>
              <strong>Community Impact:</strong> We are dedicated to producing
              graduates who contribute meaningfully to their communities,
              promoting health, wellness, and patient-centered care across all
              healthcare settings.
            </li>
            <li>
              <strong> Ethical Standards:</strong> We uphold the highest ethical
              standards in both education and patient care, fostering an
              environment where students learn to make responsible and
              compassionate decisions in their professional practice.
            </li>
          </ul>
          <br />
          <p>
            Through these guiding principles, we aim to shape the next
            generation of nurses who will lead with integrity, knowledge, and a
            strong commitment to improving the lives of others.
          </p>
          <br />
          <p>
            Join us at AV Nursing School, where your journey towards becoming a
            compassionate and skilled nurse begins.
          </p>
        </div>
      </div>
    </div>
  );
}
