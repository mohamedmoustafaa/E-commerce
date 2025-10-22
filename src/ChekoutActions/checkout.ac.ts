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
   return `https://${process.env.VERCEL_URL || "e-commerce-beta-six-61.vercel.app"}`;
}

export default async function OnlinePayment(CartID : string , url = getBaseUrl() , formValues :CheckoutSchemaType){
    const token = await MyToken()
        if(!token){
            throw new Error("Please login first")
        }
          console.log("🧭 checkout URL sent to API:", `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=${url}`);

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=${url}`,{
            method : "POST",
            headers: {
                token: String(token),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({shippingAddress: formValues })
            
        })
        
        const payment = await res.json();
        console.log("🧾 payment response:", payment); // 👈 نعرف الـ redirect URL اللي بيرجعه السيرفر

        return payment    
}