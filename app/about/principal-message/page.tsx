export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="text-center text-4xl font-bold text-primary p-4">
        Principal Message
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <div className="rounded w-100 h-100 border"></div>

          {/* <img
            src="https://source.unsplash.com/random"
            alt="Principal"
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="lg:w-1/2 p-4">
          <p>
            &quot;At AV Nursing School, we are committed to shaping the future
            of healthcare by providing our students with a strong foundation in
            nursing education, hands-on clinical training, and a compassionate
            approach to patient care. Our institution fosters an environment
            where academic excellence meets real-world experience, preparing
            aspiring nurses to excel in their careers and make a meaningful
            impact on society.
          </p>
          <br />
          <p>
            With a dedicated faculty, state-of-the-art facilities, and a
            student-centered learning approach, we ensure that every graduate
            leaves with the knowledge, skills, and confidence to thrive in the
            ever-evolving healthcare industry. We take pride in nurturing not
            just skilled professionals but also empathetic caregivers who uphold
            the highest ethical and medical standards.
          </p>
          <br />
          <p>
            Join us at AV Nursing School and embark on a journey toward a
            rewarding and fulfilling nursing career.&quot;
          </p>
          <br />
          <p>Principal&quot;s Name</p>
          <p>Principal, AV Nursing School</p>
        </div>
      </div>
    </div>
  );
}
