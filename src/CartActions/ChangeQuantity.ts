"use server"
import MyToken from "@/Utilities/MyToken"

export default async function ChangeQuantity(id : string, count : string){
    const token = await MyToken()
        if(!token){
            throw new Error("can't remove product")
        }
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            method : "PUT",
            headers: {
                token: String(token),
                "Content-Type":"application/json"
            },
            body : JSON.stringify( {count} )
        })
        
        const counter = await res.json();
        return counter
}