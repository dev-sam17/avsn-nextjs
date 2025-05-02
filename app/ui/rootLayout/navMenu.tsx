"use client";

import { Dispatch, useState, SetStateAction } from "react";
import Link from "next/link";
import {
  DragHandleHorizontalIcon,
  ChevronDownIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";

const about = {
  title: "About",
  items: [
    {
      name: "Principal Message",
      href: "/about/principal-message",
    },
    {
      name: "Our Story",
      href: "/about/our-story",
    },
    {
      name: "Our Mission",
      href: "/about/our-mission",
    },
  ],
};

const courses = {
  title: "Courses",
  items: [
    {
      name: "ANM",
      href: "/courses/anm",
    },
    {
      name: "GNM",
      href: "/courses/gnm",
    },
  ],
};

const campus = {
  title: "Campus",
  items: [
    {
      name: "Hostel",
      href: "/campus/hostel",
    },
    {
      name: "Library",
      href: "/campus/library",
    },
    {
      name: "Laboratory",
      href: "/campus/laboratory",
    },
    {
      name: "Faculty Members",
      href: "/campus/faculty",
    },
  ],
};

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-teal-700 shadow-md sticky top-0 z-1000">
        <div className="container mx-auto">
          {/* Navigation */}
          <nav className=" hidden md:flex space-x-6 items-center justify-center">
            <Link href="/" className="text-white hover:text-teal-100 p-4">
              Home
            </Link>
            <Dropdown {...about} />
            <Dropdown {...courses} />
            <Dropdown {...campus} />
            <Link
              href="/activities"
              className="text-white hover:text-teal-100 p-4"
            >
              Activities
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-teal-100 p-4"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <nav
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 flex justify-between items-center text-white"
          >
            <p className="text-xl">Menu</p>
            <button className="text-xl">
              <DragHandleHorizontalIcon width={30} height={40} />
            </button>
          </nav>
        </div>
      </header>
      {isOpen && (
        <>
          <Backdrop close={setIsOpen} />
          <SideDrawer close={setIsOpen} />
        </>
      )}
    </>
  );
};

export default NavMenu;

const Dropdown = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; href: string }[];
}) => {
  return (
    <div className="relative group z-10">
      <button className="text-white hover:text-teal-100 p-4">
        {title} &nbsp;
        <ChevronDownIcon className="inline" />
      </button>
      <div className="absolute w-[200px] ml-0 left-0 hidden space-y-2 bg-slate-50 shadow-md opacity-0 transition-opacity duration-1000 group-hover:opacity-100 group-hover:block">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className="block px-4 py-2 hover:bg-teal-100"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Backdrop = ({ close }: { close: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div
      className="md:hidden fixed top-0 w-screen h-screen bg-gray-600/70 z-20"
      onClick={() => close(false)}
    ></div>
  );
};

const SideDrawer = ({
  close,
}: {
  close: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="md:hidden fixed top-0 container w-[75%] h-full z-40 bg-teal-700 p-6 font-medium text-xl">
      <button
        className="absolute top-5 right-5 text-white"
        onClick={() => close(false)}
      >
        <Cross1Icon width={25} height={25} />
      </button>
      <Link
        href="/"
        onClick={() => close(false)}
        className="block py-2 text-white"
      >
        Home
      </Link>
      <Submenu data={about} close={close} />
      <Submenu data={courses} close={close} />
      <Submenu data={campus} close={close} />
      <Link
        href="#"
        onClick={() => close(false)}
        className="block py-2 text-white"
      >
        Activities
      </Link>
      <Link
        href="/contact"
        onClick={() => close(false)}
        className="block py-2 text-white"
      >
        Contact
      </Link>
    </div>
  );
};

type SubmenuType = {
  title: string;
  items: { name: string; href: string }[];
};

const Submenu: React.FC<{
  data: SubmenuType;
  close: Dispatch<SetStateAction<boolean>>;
}> = ({ data, close }) => {
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSubmenu = (menu: string) => {
    setSubmenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  return (
    <>
      <button
        onClick={() => toggleSubmenu("more")}
        className="py-2 w-full text-left text-white"
      >
        {data.title} &nbsp;
        <ChevronDownIcon className="inline" />
      </button>
      {submenuOpen["more"] && (
        <div className="pl-4">
          {data.items.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              onClick={() => close(false)}
              className="block py-2 text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
