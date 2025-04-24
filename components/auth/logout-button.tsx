"use client";

import clsx from "clsx";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib//actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button
        type="submit"
        className={clsx(
          "px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
        )}
      >
        <LogOut className="w-4 h-4 mr-2" />
        <span className="hidden md:block">Logout</span>
      </Button>
    </form>
  );
}
