import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FacultyForm from "@/components/faculty-form";
import { getFaculty } from "@/lib/actions/faculty";

export default async function EditFacultyPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const faculty = await getFaculty(params.id);

  if (!faculty) {
    notFound();
  }

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
        <h1 className="text-3xl font-bold text-emerald-700">Edit Faculty</h1>
        <p className="text-muted-foreground">
          Update faculty member information
        </p>
      </div>
      <div className="max-w-2xl">
        <FacultyForm faculty={faculty} />
      </div>
    </div>
  );
}
