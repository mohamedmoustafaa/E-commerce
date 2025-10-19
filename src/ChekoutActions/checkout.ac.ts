"use server"

import { CheckoutSchemaType } from "@/schema/Chekout.schema";
import MyToken from "@/Utilities/MyToken";


export default async function OnlinePayment(CartID : string , url = process.env.NEXT_URL , formValues :CheckoutSchemaType){
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