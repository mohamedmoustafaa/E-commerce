"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { resetCodeSchema, ResetCodeSchemaType } from '@/schema/resetCode.schema'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"


export default function ResetCode() {
  const router = useRouter()
  const form = useForm<ResetCodeSchemaType>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(resetCodeSchema)
  })

  async function handleResetCode(values: ResetCodeSchemaType) {
    try {
     const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values,
        { headers: { "Content-Type": "application/json" } }
      )
      


      if (res?.data?.status === "Success") {
       localStorage.setItem("resetToken", res.data.token)
       toast.success("✅ Reset code verified successfully", { position: "top-center", duration: 2000 })
       router.push('/resetPassword')
     } 
      else {
       toast.error(res?.data?.message || "❌ Invalid or expired code", { position: "top-center", duration: 2000 })
     }
  
    } 
  catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    const msg = err.response?.data?.message || err.message || "Something went wrong";
    toast.error(msg, { position: "top-center", duration: 3000 });
  } else {
    toast.error("Something went wrong", { position: "top-center", duration: 3000 });
  }
}
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Reset code</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleResetCode)}
          className="flex flex-col items-center space-y-6"
        >
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem className="w-full text-center">
                <FormLabel className="block mb-2 font-medium">Reset code:</FormLabel>

                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={field.value}              
                  onChange={field.onChange}   
                 >
                <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />

                </InputOTPGroup>
                </InputOTP>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="cursor-pointer w-1/2 bg-emerald-600 hover:bg-emerald-700 text=2xl"
            type="submit"
          >
              Verify
          </Button>
        </form>
      </Form>
    </div>
  </div>
  )
}
