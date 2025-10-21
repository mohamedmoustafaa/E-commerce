"use client"
import ChangeQuantity from '@/CartActions/ChangeQuantity'
import DeleteCart from '@/CartActions/DeleteCart'
import getLoggedUserCart from '@/CartActions/GetCart.Action'
import RemoveItems from '@/CartActions/RemoveItems'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartIconCounter'
import { CartProductType } from '@/Types/Cart.t'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import Image from "next/image";



export default function Cart() {
  const [products, setproducts] = useState([])
  const [isLoading, setloading] = useState( true)
  const [updateDisabled, setupdateDisabled] = useState( false )
  const [loadingUpdate, setloadingUpdate] = useState( false )
  const [currentId, setcurrentId] = useState( "" )
  const {numberOfCartIcon ,setnumberOfCartIcon} = useContext(CartContext)!
  const [price, setprice] = useState("")
  const [cartId, setcartId] = useState("")


  async function gerUsserCart(){
   try{
     const res = await getLoggedUserCart()
 
     if(res.status === "success"){
     setprice(res.data.totalCartPrice);
    setproducts(res.data.products);
     setloading(false)
     setcartId(res.data._id)
   }
   }
   catch(err){
     console.log(err);
      setloading(false)
   }
  }

 async function deleteProduct(id : string){
  const res = await RemoveItems(id)
  if(res.status === "success"){
   setproducts(res.data.products)
   toast.success("Product has been deleted successfully", {position : "top-center", duration: 2000})
   let sum = 0
   res.data.products.forEach((product: CartProductType)=>{
    sum+= product.count
   })
   gerUsserCart()
   setnumberOfCartIcon(sum)
  }
  else{
    toast.error("Can't delete this product !!", {position : "top-center", duration: 2000} )
  }
 }


 async function UpdateCart(id:string, count:string , sign : string) {
  setupdateDisabled(true)
  setloadingUpdate(true)
  setcurrentId(id)
  const res = await ChangeQuantity(id, count) 
  if(res.status === "success"){
   setproducts(res.data.products)
    toast.success("Quantity Updated successfully", {position : "top-center", duration :2000})
    gerUsserCart()
    setupdateDisabled(false)
    setloadingUpdate(false)
  }
  if(sign==="+"){
    setnumberOfCartIcon(numberOfCartIcon +1)
  }
  else if (sign ==="-"){
    setnumberOfCartIcon(numberOfCartIcon -1)
  }

  
  else{
    
    toast.error("Can't Change Count!!!", {position : "top-center", duration: 2000} )
   setupdateDisabled(false)
   setloadingUpdate(false)
  }
 }

 async function clear() {
  const res = await DeleteCart()
  console.log(res);
  if(res.message==="success"){
    setproducts([])
    setnumberOfCartIcon(0)
  }
 }
 useEffect(()=> {
 gerUsserCart()
 },[])
  
  if(isLoading){
    return <div className='h-screen flex justify-center items-center'>
         <div className="loader"></div>
     </div>
   }
  return <>
  {products.length > 0 ? <div className='w-2/3 mx-auto my-6'>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className='text-3xl text-center font-bold my-4'> Total price : {price} </h1>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
         Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {products.map((product : CartProductType)=>
      <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <Image
  src={product.product.imageCover}
  alt={product.product.title}
  width={128} 
  height={128}
  className="w-16 md:w-32 max-w-full max-h-full object-contain rounded-lg h-auto w-auto"
/>

        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button
            disabled={updateDisabled}
            onClick={()=>UpdateCart(product.product.id, String(product.count - 1), "-")}
            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              {product.product.id === currentId ? (
                loadingUpdate ? (
               <i className="fas fa-spinner fa-spin"></i>
               ) : (
                <span>{product.count}</span>
               )
              ) : (
               <span>{product.count}</span>
               )}

              
            
            </div>
            <button 
            disabled={updateDisabled}
            onClick={()=>UpdateCart(product.product.id, String(product.count + 1) ,"+")}
            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price * product.count} EGP 
        </td>
        <td className="px-6 py-4">
          <span onClick={()=> deleteProduct(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</span>
        </td>
      </tr>)}
    </tbody>
  </table>
  </div>
  <Link href={`/Checkout/${cartId}`}>
  <Button  className=' w-full my-2 cursor-pointer bg-emerald-600 hover:bg-emerald-700' >Checkout Now!</Button>
  </Link >
   <div className='flex justify-end '> <Button onClick={()=> clear()} className=' w-full  my-3 cursor-pointer bg-red-600 hover:bg-red-700' >Clear Cart</Button>
   </div>
  </div>
  
   : 
  <h1 className="font-bold text-3xl text-center my-12 ">No products to show!!!</h1>
  } 
  



  </>
};
