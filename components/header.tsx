"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageIcon, Bell, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogoutButton } from "./auth/logout-button";

export default function Header() {
  const pathname = usePathname();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Bell className="h-6 w-6 text-emerald-600" />
              <span className="font-bold text-xl hidden sm:inline-block">
                NoticeHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/admin/image-portal" passHref>
              <Button
                variant={pathname === "/image-portal" ? "default" : "ghost"}
                className={
                  pathname === "/image-portal"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : ""
                }
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Image Portal
              </Button>
            </Link>
            <LogoutButton />
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                <SheetClose asChild>
                  <Link
                    href="/admin/image-portal"
                    className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100"
                  >
                    <ImageIcon className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium">Image Portal</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <LogoutButton />
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your account and redirected to the login
              page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              // onClick={handleLogout}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
