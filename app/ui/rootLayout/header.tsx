"use client";

import Link from "next/link";

interface HeaderProps {
  universityName: string;
  contactInfo: {
    address: string;
    number: string;
    email: string;
  };
}

const Header: React.FC<HeaderProps> = ({ universityName, contactInfo }) => {
  return (
    // <header className="bg-white shadow-md p-4 ">
    //   <div className="container mx-auto flex items-center justify-around gap-10">
    //     <div className="flex gap-x-10">
    //       <div className="rounded-full w-10 h-10 border border-black "></div>
    //       <span
    //         className={`text-2xl font-semibold ${lilita.className} antialiased`}
    //       >
    //         {universityName}
    //       </span>
    //     </div>

    //     {/* Contact Info - Hidden on small screens */}
    //     <div className="hidden md:block text-sm text-gray-600">
    //       <div>{contactInfo.address}</div>
    //       <div>{contactInfo.email}</div>
    //       <div className="">Phone:&nbsp;{contactInfo.number}</div>
    //     </div>
    //   </div>
    // </header>
    <header className="bg-slate-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* <!-- Logo + College Name --> */}
        <Link href="/" className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
            [Logo]
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-700">
              {universityName}
            </h1>
            <p className="text-sm text-slate-800">
              Approved by INC & State Nursing Council
            </p>
          </div>
        </Link>

        {/* <!-- Contact Details --> */}
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {contactInfo.address}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +91{" "}
            {contactInfo.number}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {contactInfo.email}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
