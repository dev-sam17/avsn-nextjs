import Link from "next/link";
import { cookies } from "next/headers";

import { FrownIcon } from "lucide-react";

export default async function NotFound() {
  const currentPath = (await cookies()).get("currentPath")?.value || "/";
  const isAdmin = currentPath.startsWith("/admin");
  return (
    <main className="flex h-[50svh] flex-col items-center justify-center gap-2 p-4 m-5">
      <FrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested page.</p>
      <Link
        href={isAdmin ? "/admin" : "/"}
        className="mt-4 rounded-md bg-teal-700 px-4 py-2 text-sm text-white transition-colors hover:bg-teal-600"
      >
        Go Back
      </Link>
    </main>
  );
}
