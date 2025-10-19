
import SelectedProduct from '@/api/SelectedProduct';
import AddBtn from '@/app/_component/Addbtn/AddBtn';
import SingleProducts from '@/app/_component/SingleProducts/SingleProducts';
import relatedProducts from '@/RelatedProductsActions/relatedProducts';
import { ProductType } from '@/Types/Product.t';
import React from 'react'
import Image from 'next/image';
export default async function ProductDeatails( {params}: {params : Promise<{id: string}>} ) {

    const {id} = await params ;
    const data = await SelectedProduct(id);
    console.log(data);
    const related = await relatedProducts(data.category._id)

  return <>
  <div className="container w-[80%] mx-auto p-4 flex">
    <div className='w-1/4'>
    <Image 
  src={data.imageCover} 
  alt={data.title} 
  width={500} 
  height={500}
  className='w-full' 
  />
    </div>
    <div className='w-3/4'>
    <h1 className='text-2xl font-bold my-4'>{data.title}</h1>
    <p>{data.description}</p>
    {/* <p>{data.category.name}</p> */}
    <div className="flex justify-between w-full my-4">
     <span>{data.price}EGP</span>
      <span>{data.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
     </div>
     <AddBtn id={data.id} /> 
    </div>
  </div>
   
  <div className="container w-[80%] mx-auto my-12">
    <div>
      <h1 className="text-2xl font-bold ">
         Related Products: 
        </h1>
    </div>
      <div className='flex flex-wrap'>
      {related.data.map((currentProduct: ProductType)=> <div className='xl:w-1/5 w-full md:w-1/2 lg:w-1/4  hover:scale-105 hover:shadow-lg transition-all duration-300' key={currentProduct._id}>
      <SingleProducts product={currentProduct} />
         
      
  
     </div>)}
     </div>
     </div>
  </>
}
