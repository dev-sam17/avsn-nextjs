"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </Button>
    </form>
  );
}
