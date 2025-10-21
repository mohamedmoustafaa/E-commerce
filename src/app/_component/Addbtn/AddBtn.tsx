"use client"
import AddToCart from '@/CartActions/AddToCart'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartIconCounter'
import React, { useContext } from 'react'
import { toast } from 'sonner'


export default function AddBtn({id} : {id : string}) {
    const {numberOfCartIcon ,setnumberOfCartIcon} = useContext(CartContext)!
    
    
    
     async function AddProduct(id : string){
     const res = await AddToCart(id)
     if (!res || typeof res !== "object" || !("status" in res)) {
        toast.error("please login to add products into cart.", {position : 'top-center', duration: 2000})
        return
     }
     if(res.status=== "success"){
        toast.success("product added successfully", {position : 'top-center', duration: 2000,})

       setnumberOfCartIcon(numberOfCartIcon +1)
      }
     else{
        toast.error (res.message, {position : 'top-center', duration: 2000,})  
     }
     
    }
    
  return <>
    <Button onClick={() => AddProduct(id)} className='cursor-pointer bg-emerald-500 hover:bg-emerald-700 text-xl w-full'>+Add</Button>

  </>
  
}
