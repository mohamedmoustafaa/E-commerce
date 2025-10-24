"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { useParams, useRouter } from 'next/navigation'
import {CheckoutSchema , CheckoutSchemaType} from "@/schema/Chekout.schema"
import OnlinePayment from '@/ChekoutActions/checkout.ac'
import CashPayment from '@/ChekoutActions/CashPay'

export default function Ceckout() {

  const {id} : {id : string} = useParams();
  

  const router = useRouter()
  const form =useForm<CheckoutSchemaType>({
    defaultValues : {
      details : "",
      phone : "",
      city: "",
      
    },
    resolver: zodResolver(CheckoutSchema)
  })

  const [paymentMethod, setPaymentMethod] = React.useState<"online" | "cash" | null>(null);
   async function handleCheckout(values: CheckoutSchemaType){
   if (!paymentMethod) {
      toast.error("please choose way of payment", { position: "top-center", duration: 2000 });
      return;
    }
    if (paymentMethod === "cash"){
      const response = await CashPayment(id, values)
      if (response.status==="success") {
          router.push("/allorders"); 
          toast.success("Order has been saved successfully", { position: "top-center", duration: 2000 });
        } else {
          toast.error("Your order doesn't ", { position: "top-center", duration: 2000 });
        }
      
    }
    

     const res = await OnlinePayment( 
       id,
       values,
      )
     if(res.status=== "success"){
      window.location.href = res.session.url
     }

   
  }
  return <>
    <div className='w-1/2 mx-auto my-12'>
     <h1 className='text-3xl font-bold text-center my-3'>Checkout Now!!</h1>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCheckout)}>
       
    
     
     
     <FormField
      control={form.control}
      name="details"
      render={({field}) => (
        <FormItem>
          <FormLabel>Details: </FormLabel>
          <FormControl>
           <Input type='text' {...field}/>
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
          <FormLabel>Phone: </FormLabel>
          <FormControl>
           <Input type='tel' {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
     <FormField
      control={form.control}
      name="city"
      render={({field}) => (
        <FormItem>
          <FormLabel>City: </FormLabel>
          <FormControl>
           <Input type='text' {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
       <div className=" my-2 flex items-center justify-center gap-6">
        <label className="flex items-center space-x-2">
        <input
        type="radio"
        value="cash"
        checked={paymentMethod === "cash"}
        onChange={(e) => setPaymentMethod(e.target.value as "cash")}
    />
    <span>Cash</span>
    </label>

    <label className="flex items-center space-x-2">
    <input
      type="radio"
      value="online"
      checked={paymentMethod === "online"}
      onChange={(e) => setPaymentMethod(e.target.value as "online")}
    />
    <span>Card</span>
    </label>
    </div>

    
     <Button className='cursor-pointer my-2 w-1/4 bg-emerald-600 hover:bg-emerald-700 w-full' >Pay Now</Button>
      </form>
     
     </Form>
    </div>
    </>
}
