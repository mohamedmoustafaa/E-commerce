"use server"
import MyToken from "@/Utilities/MyToken"

export default async function RemoveItems(id: string) {
    const token = await MyToken()
    if(!token){
        throw new Error("can't remove product")
    }
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        method : "DELETE",
        headers: {
            token: String(token),
            "Content-Type":"application/json"
        },
    })
    
    const removeItem = await res.json();
    return removeItem

}