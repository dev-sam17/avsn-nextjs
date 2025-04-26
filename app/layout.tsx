import { cookies } from "next/headers";
import { Toaster } from "@/components/toaster";

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/ui/rootLayout/header";
import NavMenu from "@/ui/rootLayout/navMenu";
import { Footer } from "@/ui/rootLayout/footer";

export const metadata: Metadata = {
  title: "AVSN",
  description: "AV School Of Nursing",
};

const HeaderProps = {
  universityName: "AV School Of Nursing",
  contactInfo: {
    address: "Mahavir Nagar, Kokar, Ranchi, Jharkhand 834001",
    number: "8210692090",
    email: "example@avsn.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = (await cookies()).get("currentPath")?.value || "/";
  const isAdmin = currentPath.startsWith("/admin");

  if (isAdmin) {
    return (
      <html lang="en">
        <body>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className="bg-teal-50">
        <Header {...HeaderProps} />
        <NavMenu />

        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
