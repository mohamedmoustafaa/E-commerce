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
import { LoginSchema, LoginSchemaType } from '@/schema/login.schema'
import { signIn } from "next-auth/react"
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  })

  async function handleLogin(values: LoginSchemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    })

    console.log(response);

    if (response?.ok) {
      toast.success("You are logged in successfully", { position: "top-center", duration: 2000 })
      window.location.href = "/"
    } else {
      toast.error(response?.error, { position: "top-center", duration: 2000 })
    }

    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      if (res.data.message === "success") {
        toast.success("You are logged in successfully", { position: "top-center", duration: 2000 })
        router.push('/')
      }
    } 
    catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    toast.error(err.response?.data?.message || "Something went wrong", { position: "top-center", duration: 2000 });
  } else {
    toast.error("Something went wrong", { position: "top-center", duration: 2000 });
  }
}
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center my-2 w-full">
              <Button className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 w-1/4">
                Submit
              </Button>

              <Link
                href="/ForgetPassword"
                className="text-red-500 hover:text-red-600"
              >
                Forget my Password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
