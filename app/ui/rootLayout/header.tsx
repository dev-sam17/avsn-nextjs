"use client";

import { lilita } from "../fonts";

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
    <header className="bg-white shadow-md p-4 ">
      <div className="container mx-auto flex items-center justify-around gap-10">
        <div className="flex gap-x-10">
          <div className="rounded-full w-10 h-10 border border-black "></div>
          <span
            className={`text-2xl font-semibold ${lilita.className} antialiased`}
          >
            {universityName}
          </span>
        </div>

        {/* Contact Info - Hidden on small screens */}
        <div className="hidden md:block text-sm text-gray-600">
          <div>{contactInfo.address}</div>
          <div>{contactInfo.email}</div>
          <div className="">Phone:&nbsp;{contactInfo.number}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
