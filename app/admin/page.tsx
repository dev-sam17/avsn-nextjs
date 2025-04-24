"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/public/avsn-logo.jpg";
import { LogoutButton } from "@/components/auth/logout-button";

const cards = [
  {
    name: "Image Portal",
    description: "Upload, manage, and organize images for your content.",
    link: "/admin/image-portal",
  },
  {
    name: "News And Notices",
    description: "Add News and notices ",
    link: "/admin/notices",
  },
  {
    name: "Faculty Management",
    description: "Add or update faculty information.",
    link: "/admin/faculty",
  },
  // {
  //   name: "Settings",
  //   description: "Update application configuration and preferences.",
  //   link: "/admin/settings",
  // },
];

export default function AdminPortal() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-600 text-white py-2 px-6 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            alt="College Logo"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="text-xl font-semibold">Admin Portal</div>
        </div>

        <LogoutButton />
      </header>

      {/* Main Cards */}
      <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card, idx) => (
          <Link
            key={idx}
            href={card.link}
            className="hover:shadow-lg transition-shadow"
          >
            <Card className="hover:border-emerald-500 transition-all h-full">
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                  {card.name}
                </h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
}
