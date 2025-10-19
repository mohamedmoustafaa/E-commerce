'use server'


export default async function relatedProducts(CatId : string) {
   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${CatId}`)
   const payload = await res.json();
   return payload

}