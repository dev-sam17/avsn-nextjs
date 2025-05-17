"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFaculties, deleteFaculty } from "@/lib/actions/faculty";
import { Prisma } from "@/lib/prisma";

type Faculty = Prisma.Faculty;

export default function FacultyList() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const data = await getFaculties();
        setFaculties(data);
      } catch (error) {
        console.error("Failed to load faculties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFaculties();
  }, []);

  const handleDeleteClick = (id: string) => {
    setFacultyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (facultyToDelete) {
      try {
        await deleteFaculty(facultyToDelete);
        setFaculties(
          faculties.filter((faculty) => faculty.id !== facultyToDelete)
        );
      } catch (error) {
        console.error("Failed to delete faculty:", error);
      } finally {
        setDeleteDialogOpen(false);
        setFacultyToDelete(null);
      }
    }
  };

  const filteredFaculties = faculties.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search faculties..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={
              viewMode === "table" ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }
          >
            Table View
          </Button>
          <Button
            variant={viewMode === "card" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("card")}
            className={
              viewMode === "card" ? "bg-emerald-600 hover:bg-emerald-700" : ""
            }
          >
            Card View
          </Button>
        </div>
      </div>

      {filteredFaculties.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No faculty members found.</p>
        </div>
      ) : viewMode === "table" ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculties.map((faculty) => (
                <TableRow key={faculty.id}>
                  <TableCell className="font-medium">{faculty.name}</TableCell>
                  <TableCell>{faculty.designation}</TableCell>
                  <TableCell>{faculty.department || "—"}</TableCell>
                  <TableCell>{faculty.qualification}</TableCell>
                  <TableCell>
                    {faculty.experience ? `${faculty.experience} years` : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/faculty/${faculty.id}/edit`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4 text-emerald-600" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteClick(faculty.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredFaculties.map((faculty) => (
            <Card key={faculty.id} className="overflow-hidden">
              <div className="aspect-square relative bg-emerald-50">
                {faculty.imageUrl ? (
                  <Image
                    src={faculty.imageUrl || "/placeholder.svg"}
                    alt={faculty.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-6xl font-bold text-emerald-200">
                      {faculty.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-bold">{faculty.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {faculty.designation}
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  {faculty.department && (
                    <Badge variant="outline" className="bg-emerald-50">
                      {faculty.department}
                    </Badge>
                  )}
                  <div className="text-sm">
                    <span className="font-medium">Qualification:</span>{" "}
                    {faculty.qualification}
                  </div>
                  {faculty.experience && (
                    <div className="text-sm">
                      <span className="font-medium">Experience:</span>{" "}
                      {faculty.experience} years
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Link href={`/admin/faculty/${faculty.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-emerald-600 border-emerald-600"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600"
                    onClick={() => handleDeleteClick(faculty.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this faculty member? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
