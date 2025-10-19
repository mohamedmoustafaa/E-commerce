"use server"

import MyToken from "@/Utilities/MyToken"


  export default async function AddToCart (id : string){
   try{
     const token = await MyToken();
      
    if(!token){
        throw new Error("please login to be able to add product")
    }     
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
  method: "POST",
  headers: {
    token: String(token),   // 👈 force it to string
    "Content-Type": "application/json"
  } as HeadersInit,          // 👈 علشان TS يفهم إن ده HeadersInit
  body: JSON.stringify({
    productId: id
  })
});

  const payload = await res.json();
  return payload
   }
   catch(err){
    return err
   }
}