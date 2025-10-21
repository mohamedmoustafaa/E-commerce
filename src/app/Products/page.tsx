import React from 'react'

import getProducts from '@/api/Poducts.api';
import SingleProducts from '../_component/SingleProducts/SingleProducts';
import { ProductType } from '@/Types/Product.t';


export default async function Products() {
  
  const data = await getProducts()

 

  return <>
   <div className="container w-[80%] mx-auto my-12">
    <div className='flex flex-wrap'>
    {data.map((currentProduct: ProductType)=> <div className='xl:w-1/5 w-full md:w-1/2 lg:w-1/4  hover:scale-105 hover:shadow-lg transition-all duration-300' key={currentProduct._id}>
    <SingleProducts product={currentProduct} />
       
    

   </div>)}
   </div>
   </div>
  </>
}
