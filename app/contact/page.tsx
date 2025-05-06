import Link from "next/link";
import {
  Facebook,
  MapPin,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ColourfulText } from "@/components/ui/colourful-text";
import ContactForm from "@/components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - AV School of Nursing",
  description: "Get in touch with AV School of Nursing for admissions, queries, and campus visits.",
  openGraph: {
    title: "Contact Us - AV School of Nursing",
    description: "Reach out to AV School of Nursing for all inquiries and admissions.",
    url: "https://www.avschoolofnursing.in/contact",
    siteName: "AV School of Nursing",
    images: [{ url: "https://www.avschoolofnursing.in/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - AV School of Nursing",
    description: "Contact our team for admissions and queries.",
    images: ["https://www.avschoolofnursing.in/og-image.jpg"],
  },
};


export default function ContactPage() {
  const whatsappNumber = "+918210692090";
  const email = `avschoolofnursing121@gmail.com`;
  const whatsappMessage = encodeURIComponent(
    "Hello, I'd like to get in touch!"
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12 ">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-teal-700">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;d love to hear from you. Fill out the form below or reach
              out through any of our channels.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8 ">
              <Card className=" dark:bg-slate-950">
                <CardContent className="p-6 ">
                  <div className="space-y-6 ">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                        <a href={`tel:${whatsappNumber}`}>
                          <Phone className="h-5 w-5 text-primary" />
                        </a>
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          +91 (821) 069-2090
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                        <a href={`mailto:${email}`}>
                          <Mail className="h-5 w-5 text-primary" />
                        </a>
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">
                          Mahavir Nagar, Kokar, Ranchi, Jharkhand 834001
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  <ColourfulText text="Connect" /> With Us
                </h2>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="#"
                    target="_blank"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-primary-foreground hover:bg-teal-800 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>

                  <Link
                    href="#"
                    target="_blank"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-primary-foreground hover:bg-teal-800 transition-colors"
                  >
                    <Instagram className="h-5 w-5 " />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="#"
                    target="_blank"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-primary-foreground hover:bg-teal-800 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>

                <div className="pt-2 ">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full gap-2 bg-teal-600 hover:bg-teal-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-white"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6 shadow-sm dark:bg-slate-950">
                <h2 className="text-xl font-semibold mb-4">
                  Send me a message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
