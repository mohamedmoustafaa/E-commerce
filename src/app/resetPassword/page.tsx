"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { ResetPassSchema, ResetPasswordSchemaType } from '@/schema/ResetPassword.schema'

export default function ResetPassword() {
  const router = useRouter()
  
  const form = useForm<ResetPasswordSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(ResetPassSchema),
  })

  async function handleResetPassword(values: ResetPasswordSchemaType) {
    try {
      const token = localStorage.getItem("resetToken")

      if (!token) {
        toast.error("Reset token not found. Please verify your code again.", {
          position: "top-center",
        })
        return
      }

      console.log("Reset Token:", token)
      console.log("Email:", values.email)
      console.log("New Password:", values.newPassword)

      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: token, 
          },
        }
      )

      console.log("Full Response:", res)
      if (res.status === 200 && res.data.token) {
        toast.success("Password reset successfully!", {
          position: "top-center",
          duration: 2000,
        })

        localStorage.removeItem("resetToken") // امسح التوكن القديم

        // ✅ روح على صفحة اللوجن بعد ثانية
        setTimeout(() => {
          router.push("/login")
        }, 1200)
      } else {
        toast.error(res.data.message || "Failed to reset password", {
          position: "top-center",
          duration: 3000,
        })
      }
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    console.log("Full error details:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.response?.data?.message,
    });

    const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
    toast.error(errorMessage, { position: "top-center", duration: 3000 });
  } else {
    console.log("Unexpected error:", err);
    toast.error("Something went wrong", { position: "top-center", duration: 3000 });
  }
}

  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Reset Password</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleResetPassword)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password:</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
