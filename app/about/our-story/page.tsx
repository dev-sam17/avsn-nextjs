export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="text-center text-4xl font-bold text-primary p-4">
        Our Story
      </div>
      <div className="flex">
        <div className="w-1/2 p-4">
        <div className="rounded w-100 h-100 border"></div>

          {/* <img
            src="https://source.unsplash.com/random"
            alt="Principal"
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="w-1/2 p-4"></div>
      </div>
    </div>
  );
}
