import Link from "next/link";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FacultyList from "@/components/faculty-list";
import { LogoutButton } from "@/components/auth/logout-button";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-lg  lg:text-3xl font-bold text-black">
            Faculty Management
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/faculty/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="hidden md:block">Add Faculty</span>
            </Button>
          </Link>

          <LogoutButton />
        </div>
      </div>
      <FacultyList />
    </div>
  );
}
