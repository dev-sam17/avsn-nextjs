"use server"

import { Prisma, prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type Notice = Prisma.Notice

export async function getNotices(): Promise<Notice[]> {
    try {
        const notices = await prisma.notice.findMany({
            orderBy: {
                createdAt: "desc",
            },
        })
        return notices
    } catch (error) {
        console.error("Failed to fetch notices:", error)
        return []
    }
}

export async function getNoticeById(id: string): Promise<Notice | null> {
    try {
        const notice = await prisma.notice.findUnique({
            where: { id },
        })
        return notice
    } catch (error) {
        console.error(`Failed to fetch notice with id ${id}:`, error)
        return null
    }
}

export async function createNotice(data: {
    title: string
    content: string
    fileUrl?: string | null
}): Promise<Notice | null> {
    try {
        const notice = await prisma.notice.create({
            data: {
                title: data.title,
                content: data.content,
                fileUrl: data.fileUrl || null,
            },
        })
        revalidatePath("/")
        return notice
    } catch (error) {
        console.error("Failed to create notice:", error)
        return null
    }
}

export async function updateNotice(
    id: string,
    data: { title?: string; content?: string; fileUrl?: string | null },
): Promise<Notice | null> {
    try {
        const notice = await prisma.notice.update({
            where: { id },
            data,
        })
        revalidatePath("/")
        return notice
    } catch (error) {
        console.error(`Failed to update notice with id ${id}:`, error)
        return null
    }
}

export async function deleteNotice(id: string): Promise<boolean> {
    try {
        await prisma.notice.delete({
            where: { id },
        })
        revalidatePath("/")
        return true
    } catch (error) {
        console.error(`Failed to delete notice with id ${id}:`, error)
        return false
    }
}
