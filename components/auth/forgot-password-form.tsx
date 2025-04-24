"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

import { requestReset } from "@/lib/actions/password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);

    const response = await requestReset(formData);
    const result = {
      error: typeof response.error === "string" ? response.error : null,
      success: typeof response.success === "string" ? response.success : null,
    };
    if (result?.error) {
      setError(result.error);
    }

    if (result?.success) {
      setSuccess(result.success);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Reset Link:{" "}
              <Link
                href={`${window.location.origin}/reset-password?token=${success}`}
              >
                Click here
              </Link>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <SubmitButton />
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-500"
            >
              Back to login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-emerald-600 hover:bg-emerald-700"
      disabled={pending}
    >
      {pending ? "Sending reset link..." : "Send reset link"}
    </Button>
  );
}
