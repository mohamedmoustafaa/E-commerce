"use server"

import { CheckoutSchemaType } from "@/schema/Chekout.schema";
import MyToken from "@/Utilities/MyToken";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // في حالة التشغيل على vercel
  return `https://${process.env.VERCEL_URL}`;
}

export default async function OnlinePayment(CartID : string , url = getBaseUrl() , formValues :CheckoutSchemaType){
    const token = await MyToken()
        if(!token){
            throw new Error("Please login first")
        }
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=${url}`,{
            method : "POST",
            headers: {
                token: String(token),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({shippingAddress: formValues })
            
        })
        
        const payment = await res.json();
        return payment    
}