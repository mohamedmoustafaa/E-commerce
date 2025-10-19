"use server"
import MyToken from "@/Utilities/MyToken"


  export  default async function GetLoggedWishlistUser(){

    const token = await MyToken()
    if(!token){
     throw new Error(" please login to see cart")}
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        method : "GET",
        headers: {
            token: String(token),
            "Content-Type":"application/json"
        },
    })

    const wishlist = await res.json()

    return wishlist
}