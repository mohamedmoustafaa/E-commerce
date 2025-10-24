import React from "react";
import GetProductsByBrand from "@/api/GetSpecificBrand";
import SingleProducts from "@/app/_component/SingleProducts/SingleProducts";
import { ProductType } from "@/Types/Product.t";   

interface BrandProductsProps {
  params: {
    id: string;
  };
}

export default async function BrandProducts({ params }: BrandProductsProps) {

  const products: ProductType[] = await GetProductsByBrand(params.id);

  return (
    <div className="container w-[80%] mx-auto my-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Products for this Brand
      </h2>

      <div className="flex flex-wrap justify-between gap-y-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <SingleProducts product={product} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 w-full">
            No products found for this brand....
          </p>
        )}
      </div>
    </div>
  );
}
