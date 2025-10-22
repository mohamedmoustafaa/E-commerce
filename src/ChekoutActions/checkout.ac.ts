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

   return `https://${process.env.VERCEL_URL || "e-commerce-beta-six-61.vercel.app"}`;
}

export default async function OnlinePayment(
  CartID: string,
  formValues: CheckoutSchemaType,
    ){
    const token = await MyToken()
        if(!token){
            throw new Error("Please login first")
        }
          const baseUrl = getBaseUrl();


        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=${baseUrl}`,{
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