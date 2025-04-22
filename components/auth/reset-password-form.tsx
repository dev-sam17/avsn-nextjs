"use client"

import { useState } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import { useSearchParams } from "next/navigation"

import { resetPassword } from "@/lib/password"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setSuccess(null)

    if (!token) {
      setError("Missing reset token")
      return
    }

    formData.append("token", token)
    const result = await resetPassword(formData)

    if (result?.error) {
      setError(result.error)
    }

    if (result?.success) {
      setSuccess(result.success)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
              <div className="mt-2">
                <Link href="/login" className="text-green-700 font-medium underline">
                  Back to login
                </Link>
              </div>
            </div>
          )}
          {!success && (
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          )}
        </CardContent>
        {!success && (
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        )}
      </form>
    </Card>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={pending}>
      {pending ? "Resetting password..." : "Reset password"}
    </Button>
  )
}
