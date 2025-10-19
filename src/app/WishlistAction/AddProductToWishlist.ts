"use server"

import MyToken from "@/Utilities/MyToken"


  export default async function AddToWishlist (id : string){
   try{
     const token = await MyToken();
      
    if(!token){
        throw new Error("please login to be able to add product")
    }     
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
  method: "POST",
  headers: {
    token: String(token),   
    "Content-Type": "application/json"
  } as HeadersInit,          
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