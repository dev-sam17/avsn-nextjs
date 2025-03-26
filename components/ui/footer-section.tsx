"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { MiniMap } from "@/app/ui/rootLayout/miniMap";

function Footerdemo() {
  // const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isDarkMode] = React.useState(false);
  // const [isChatOpen, setIsChatOpen] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto bg-zinc-800 text-zinc-400">
        <div className=" grid gap-10 md:grid-cols-2 lg:grid-cols-4 px-4 pt-6 md:px-6 lg:px-8">
          <div className="relative md:ml-5">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Home
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                About Us
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Services
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Products
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Contact
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h3>
            <address className="space-y-2 text-sm not-italic">
              <p>Mahavir Nagar, Kokar</p>
              <p>Ranchi, Jharkhand 834001</p>
              <p>Phone: 08210692090</p>
              <p>Email: hello@example.com</p>
            </address>
          </div>
          <div className="relative">
            <MiniMap />
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 text-zinc-300 mt-12 flex flex-col items-center justify-between gap-4 border-y border-zinc-400 pt-8 text-center md:flex-row px-4 pb-6 md:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © 2025 AV School Of Nursing. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
