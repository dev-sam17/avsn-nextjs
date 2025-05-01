"use server";

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { ActivityForm } from "@/lib/types";

export async function createActivity(data: ActivityForm) {
    try {
        const activity = await prisma.activity.create({
            data,
        })
        revalidatePath("/admin/image-portal")
        return activity
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to create activity")
    }
}

export async function getActivities() {
    try {
        const activities = await prisma.activity.findMany({
            orderBy: {
                date: "desc",
            },
        })
        return activities
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to fetch activities")
    }
}

export async function deleteActivity(id: string) {
    try {
        await prisma.activity.delete({
            where: { id },
        })
        revalidatePath("/admin/image-portal")
        return
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to delete activity")
    }
}
