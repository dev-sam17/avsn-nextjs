import Link from "next/link";
import { PlusCircle, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FacultyList from "@/components/faculty-list";
import { LogoutButton } from "@/components/auth/logout-button";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <Link href={"/admin"}>
            <Button className="bg-white text-emerald-700 hover:text-emerald-50 text-lg border border-emerald-600 hover:bg-emerald-700">
              <Undo2 className="mr-2 h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg  lg:text-3xl font-bold text-emerald-700">
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
