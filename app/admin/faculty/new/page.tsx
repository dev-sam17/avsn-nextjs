import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FacultyForm from "@/components/faculty-form";

export default function NewFacultyPage() {
  return (
    <div className="container mx-auto py-10">
      <Link
        href="/"
        className="flex items-center text-emerald-600 mb-6 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Faculty List
      </Link>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-700">Add New Faculty</h1>
        <p className="text-muted-foreground">
          Create a new faculty member record
        </p>
      </div>
      <div className="max-w-2xl">
        <FacultyForm />
      </div>
    </div>
  );
}
