import React from "react";
import GetProductsByCategory from "@/api/GetProductsByCategory.api";
import SingleProducts from "@/app/_component/SingleProducts/SingleProducts";
import { ProductType } from "@/Types/Product.t";

interface Props {
  params: {
    id: string;
  };
}

export default async function CategoryProductsPage({ params }: Props) {
  const products = await GetProductsByCategory(params.id);

  return (
   <div className="container w-[80%] mx-auto my-12">
  {products.length === 0 ? (
    <div className="text-center text-gray-600 text-lg">
      No products found for this category...
    </div>
  ) : (
    <div className=" pt-16 flex flex-wrap justify-between gap-y-6">
      {products.map((product: ProductType) => (
        <div
          key={product._id}
          className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 hover:scale-105  transition-all duration-300"
        >
          <SingleProducts product={product} />
        </div>
      ))}
    </div>
  )}
</div>

  );
}
