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

      <div className="flex flex-wrap justify-center">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              className="xl:w-1/5 w-full md:w-1/2 lg:w-1/4"
              key={product._id} 
            >
              <SingleProducts product={product} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 w-full">
            No products found for this brand.
          </p>
        )}
      </div>
    </div>
  );
}
