"use server"

import MyToken from "@/Utilities/MyToken";

export default async function DeleteCart() {
    const token = await MyToken()
        if(!token){
            throw new Error("can't remove product")
        }
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            method : "DELETE",
            headers: {
                token: String(token),
            },
            
        })
        
        const Delete = await res.json();
        return Delete    
}