import { cookies } from "next/headers";
import { Toaster } from "@/components/toaster";
import { Analytics } from "@vercel/analytics/next";

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/ui/rootLayout/header";
import NavMenu from "@/ui/rootLayout/navMenu";
import { Footer } from "@/ui/rootLayout/footer";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "AVSN",
  description: "AV School Of Nursing",
};

const HeaderProps = {
  universityName: "AV School Of Nursing",
  contactInfo: {
    address: "Mahavir Nagar, Kokar, Ranchi, Jharkhand 834001",
    number: "8210692090",
    email: "avschoolofnursing121@gmail.com",
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
          <main>
            <AuthProvider>{children}</AuthProvider>
          </main>
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
        <Analytics />
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
