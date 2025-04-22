"use server";

import { hash } from "bcrypt"
import { prisma } from "@/lib/prisma"
import { signIn, signOut } from '@/auth'
import { AuthError } from "next-auth"
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function register(formData: FormData) {
    const validatedFields = registerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { name, email, password } = validatedFields.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        return { error: { email: ["Email already in use"] } }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    // Sign in the user
    await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
    })
}

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        })
    } catch (err) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw err
    }
    return { success: true }
}

export async function logoutAction() {
    await signOut({ redirectTo: "/login" })
}