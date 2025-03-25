export const MapLocation = () => {
  return (
    <div className="bg-white w-[90%] mx-auto md:mx-5 my-5 md:w-[50%]  h-[50vh] md:h-[30vh] lg:h-[50vh] p-4 border rounded shadow flex justify-center items-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.3810352389605!2d85.3633114!3d23.374429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e37fd8cb5fdb%3A0x932adc2859f1be5b!2sAV%20SCHOOL%20OF%20NURSING!5e0!3m2!1sen!2sin!4v1740390925034!5m2!1sen!2sin"
        width="600"
        height="320"
        style={{ border: 0, borderRadius: "10px" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
