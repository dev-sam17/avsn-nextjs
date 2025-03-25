export const MiniMap = () => {
  return (
    <div className="p-1 flex items-center justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.3810352389605!2d85.3633114!3d23.374429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e37fd8cb5fdb%3A0x932adc2859f1be5b!2sAV%20SCHOOL%20OF%20NURSING!5e0!3m2!1sen!2sin!4v1740390925034!5m2!1sen!2sin"
        width="350"
        height="250"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
