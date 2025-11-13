"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signUpSchema , signUpSchemaType } from '@/schema/register.schema'
import axios from 'axios'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'







export default function Register() {
  const router = useRouter()
  const form =useForm<signUpSchemaType>({
    defaultValues : {
      name : "",
      email : "",
      password : "",
      rePassword : "",
      phone : "",
    },
    resolver: zodResolver(signUpSchema)
  })
   async function handleRegister(values : signUpSchemaType){
   try{
    const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
   if(res.data.message=== "success"){
    toast.success("Your signup is successfully", {position : "top-center", duration :2000})
    router.push('/login')
   } 
   }

   catch(err: unknown) {
  if (axios.isAxiosError(err)) {
    toast.error(err.response?.data?.message || "Something went wrong", {
      position: "top-center",
      duration: 2000
    });
  } else {
    toast.error("Something went wrong", {
      position: "top-center",
      duration: 2000
    });
  }
}
  }

 return <>
  <div className='pt-12 w-1/2 mx-auto my-12 '>
   <h1 className='text-3xl font-bold text-center my-3'>Sign up Now!</h1>
   <Form  {...form}>
    <form  onSubmit={form.handleSubmit(handleRegister)}>
      <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel>Name: </FormLabel>
        <FormControl>
         <Input {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
   
   
   <FormField
    control={form.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <FormLabel className='my-1'>e-mail: </FormLabel>
        <FormControl>
         <Input type='email' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )} 
  />
   <FormField
    control={form.control}
    name="password"
    render={({field}) => (
      <FormItem>
        <FormLabel className='my-1'>password: </FormLabel>
        <FormControl>
         <Input type='password' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )} 
  />
   <FormField
    control={form.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
        <FormLabel className='my-1'>rePassword: </FormLabel>
        <FormControl>
         <Input type='password' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )} 
  />
   <FormField
    control={form.control}
    name="phone"
    render={({field}) => (
      <FormItem>
        <FormLabel className='my-1'>phone: </FormLabel>
        <FormControl>
         <Input type='tel' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )} 
  />
   <Button className='cursor-pointer my-2 w-1/4 bg-emerald-600 hover:bg-emerald-700' >Submit</Button>
    </form>
   
   </Form>
  </div>
  </>
}
