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
import { ForgetPasswordSchema, ForgetPasswordSchemaType } from '@/schema/ForgetPassword.schema'

export default function ForgetPassword() {
  const router = useRouter()
  const form = useForm<ForgetPasswordSchemaType>({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgetPasswordSchema)
  })

  async function handleForgetPassword(values: ForgetPasswordSchemaType) {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      

      if (res?.data?.statusMsg === "success") {
        toast.success("Your reset code sent successfully", { position: "top-center", duration: 2000 })
        router.push('/resetCode')
      } else {
        toast.error(res?.data?.message || "Failed to send reset code", { position: "top-center", duration: 2000 })
      }
    } 
    catch (err: unknown) {
      let msg = "Something went wrong";

      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }

      toast.error(msg, { position: "top-center", duration: 3000 });
    }
  }

  return (
    <div className='w-1/2 mx-auto my-12'>
      <h1 className='text-3xl font-bold text-center my-3'>Forget Password</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgetPassword)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>e-mail: </FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='cursor-pointer my-2 w-1/4 bg-emerald-600 hover:bg-emerald-700' type="submit">
            Send Code
          </Button>
        </form>
      </Form>
    </div>
  )
}
