import SelectedProduct from '@/api/SelectedProduct';
import AddBtn from '@/app/_component/Addbtn/AddBtn';
import SingleProducts from '@/app/_component/SingleProducts/SingleProducts';
import relatedProducts from '@/RelatedProductsActions/relatedProducts';
import { ProductType } from '@/Types/Product.t';
import React from 'react'
import Image from 'next/image';

export default async function ProductDeatails({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const data = await SelectedProduct(id);
  const related = await relatedProducts(data.category._id);

  return (
    <>
      {/*  Product Details Section */}
      <div className="  container pt-20 w-[90%] mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/3">
          <Image
            src={data.imageCover}
            alt={data.title}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold my-4">{data.title}</h1>
          <p className="text-gray-700 mb-4">{data.description}</p>

          <div className="flex justify-between w-full my-4">
            <span className="text-lg font-semibold">{data.price} EGP</span>
            <span className="text-yellow-500 font-semibold">
              {data.ratingsAverage} <i className="fas fa-star"></i>
            </span>
          </div>

          <AddBtn id={data.id} />
        </div>
      </div>

      {/* 🟣 Related Products Section */}
      <div className="flex flex-wrap justify-between gap-y-6 w-[90%] mx-auto my-12">
        <h1 className="text-2xl font-bold w-full mb-4">Related Products:</h1>

        <div className="flex flex-wrap justify-between w-full">
          {related.data.map((currentProduct: ProductType) => (
            <div
              key={currentProduct._id}
              className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 hover:scale-105  transition-all duration-300"
            >
              <SingleProducts product={currentProduct} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
