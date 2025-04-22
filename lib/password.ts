"use server"

import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"
import { randomBytes } from "crypto"
import { addMinutes } from "date-fns"
import { z } from "zod"

export async function requestReset(formData: FormData) {
    const token = randomBytes(32).toString("hex")
    const expires = addMinutes(new Date(), 15)

    const user = await prisma.user.findUnique({ where: { email: formData.get("email") as string } })
    if (!user) {
        return { error: "User not found" }
    }

    const tokenEntry = await prisma.passwordResetToken.create({
        data: { email: user.email, token, expires },
    })

    if (!tokenEntry) {
        // return { error: "Error creating token entry" }
    }

    // TODO: Send token via email (send with URL like /reset-password?token=xyz)
    return { success: token }
}

const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
})

export async function resetPassword(formData: FormData) {
    const raw = {
        token: formData.get("token"),
        password: formData.get("password"),
    }

    const parsed = resetPasswordSchema.safeParse(raw)
    if (!parsed.success) {
        return { error: parsed.error.errors[0].message }
    }

    const { token, password: newPassword } = parsed.data

    const record = await prisma.passwordResetToken.findUnique({ where: { token } })
    if (!record || record.expires < new Date()) {
        return { error: "Token expired or invalid" }
    }

    const hashed = await hash(newPassword, 10)

    await prisma.user.update({
        where: { email: record.email },
        data: { password: hashed },
    })

    await prisma.passwordResetToken.delete({ where: { token } })
    return { success: "Password changed successfully" }
}