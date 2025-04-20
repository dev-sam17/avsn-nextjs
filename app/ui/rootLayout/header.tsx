"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/avsn-logo.jpg";

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
    <header className="bg-slate-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* <!-- Logo + College Name --> */}
        <Link href="/" className="flex items-center gap-4 mb-4 md:mb-0">
          <Image src={Logo} alt="College Logo" width={64} height={64} />
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
