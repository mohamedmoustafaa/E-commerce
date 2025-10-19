import React from "react";
import GetProductsByBrand from "@/api/GetSpecificBrand";
import SingleProducts from "@/app/_component/SingleProducts/SingleProducts";


interface Product {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  category: {
    name: string;
  };
  ratingsAverage: number;
}

export default async function BrandProducts({ params }: { params: { id: string } }) {
  const products = await GetProductsByBrand(params.id);

  return (
    <div className="container w-[80%] mx-auto my-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Products for this Brand
      </h2>

      <div className="flex flex-wrap justify-center">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <div
              className="xl:w-1/5 w-full md:w-1/2 lg:w-1/4"
              key={product.id}
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
