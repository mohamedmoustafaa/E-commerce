import getProducts from '@/api/Poducts.api'
import React from 'react'
import SingleProducts from '../SingleProducts/SingleProducts'
import { ProductType } from '@/Types/Product.t'

export default async function AllProducts() {

  const data = await getProducts()
  return <>
    <div className="container w-[90%] mx-auto my-12">
      <div className="flex flex-wrap justify-between gap-y-6">
        {data.map((currentProduct: ProductType) => (
          <div
            className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:scale-105 transition-all duration-300"
            key={currentProduct._id}
          >
            <SingleProducts product={currentProduct} />
          </div>
        ))}
      </div>
    </div>
  </>
}
