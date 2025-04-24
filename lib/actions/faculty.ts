"use server"

import { revalidatePath } from "next/cache"
import { Prisma, prisma } from "@/lib/prisma"

type Faculty = Prisma.Faculty

export async function getFaculties(): Promise<Faculty[]> {
    try {
        const faculties = await prisma.faculty.findMany({
            orderBy: {
                name: "asc",
            },
        })
        return faculties
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to fetch faculty data")
    }
}

export async function getFaculty(id: string): Promise<Faculty | null> {
    try {
        const faculty = await prisma.faculty.findUnique({
            where: {
                id,
            },
        })
        return faculty
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to fetch faculty")
    }
}

export async function createFaculty(data: Omit<Faculty, "id">): Promise<Faculty> {
    try {
        const faculty = await prisma.faculty.create({
            data,
        })
        revalidatePath("/")
        return faculty
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to create faculty")
    }
}

export async function updateFaculty(id: string, data: Partial<Omit<Faculty, "id">>): Promise<Faculty> {
    try {
        const faculty = await prisma.faculty.update({
            where: {
                id,
            },
            data,
        })
        revalidatePath("/")
        return faculty
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to update faculty")
    }
}

export async function deleteFaculty(id: string): Promise<Faculty> {
    try {
        const faculty = await prisma.faculty.delete({
            where: {
                id,
            },
        })
        revalidatePath("/")
        return faculty
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to delete faculty")
    }
}
