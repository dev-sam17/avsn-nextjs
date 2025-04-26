"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import type { Message, MessageForm } from "@/lib/types"

export async function fetchMessages(filter: "all" | "unread" | "archived" = "all"): Promise<Message[]> {
    try {
        let whereClause = {}

        if (filter === "unread") {
            whereClause = {
                read: false,
                archived: false,
            }
        } else if (filter === "archived") {
            whereClause = {
                archived: true,
            }
        } else {
            // "all" filter - show non-archived messages
            whereClause = {
                archived: false,
            }
        }

        const messages = await prisma.message.findMany({
            where: whereClause,
            orderBy: {
                createdAt: "desc",
            },
        })

        return messages
    } catch (error) {
        console.error("Error fetching messages:", error)
        throw new Error("Failed to fetch messages")
    }
}

export async function addMessage(data: MessageForm): Promise<Message> {
    try {
        const message = await prisma.message.create({
            data,
        })
        return message
    } catch (error) {
        console.error("Error creating message:", error)
        throw new Error("Failed to create message")
    }
}

export async function markAsRead(id: string): Promise<void> {
    try {
        await prisma.message.update({
            where: { id },
            data: { read: true },
        })

        revalidatePath("/admin/messages")
    } catch (error) {
        console.error("Error marking message as read:", error)
        throw new Error("Failed to mark message as read")
    }
}

export async function markAsUnread(id: string): Promise<void> {
    try {
        await prisma.message.update({
            where: { id },
            data: { read: false },
        })

        revalidatePath("/admin/messages")
    } catch (error) {
        console.error("Error marking message as unread:", error)
        throw new Error("Failed to mark message as unread")
    }
}

export async function archiveMessage(id: string): Promise<void> {
    try {
        // First get the current state
        const message = await prisma.message.findUnique({
            where: { id },
            select: { archived: true },
        })

        if (!message) {
            throw new Error("Message not found")
        }

        // Toggle the archived state
        await prisma.message.update({
            where: { id },
            data: { archived: !message.archived },
        })

        revalidatePath("/admin/messages")
    } catch (error) {
        console.error("Error archiving/unarchiving message:", error)
        throw new Error("Failed to archive/unarchive message")
    }
}

export async function deleteMessage(id: string): Promise<void> {
    try {
        await prisma.message.delete({
            where: { id },
        })

        revalidatePath("/admin/messages")
    } catch (error) {
        console.error("Error deleting message:", error)
        throw new Error("Failed to delete message")
    }
}
