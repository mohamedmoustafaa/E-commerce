"use client";
import React, { useEffect, useState } from "react";
import GetAllBrands from "@/api/GetAllBrands";
import Image from "next/image";
import Link from "next/link";


interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      const data = await GetAllBrands();
      setBrands(data);
      setLoading(false);
    }
    fetchBrands();
  }, []);

  if (loading) {
    return (
       <div className='h-screen flex justify-center items-center'>
        <div className="loader"></div>
    </div>
    );
  }

  return (
    <div className="min-h-screen  text-white py-16">
      <div className="container mx-auto w-[80%]">
        <h1 className="text-3xl font-bold text-center mb-12">Our Brands</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {brands.map((brand) => (
           <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="bg-white rounded-xl overflow-hidden border border-gray-400 hover:scale-105 hover:shadow-lg transition-all duration-300"
       >
       <div className="flex justify-center items-center h-40 p-4 bg-white">
       <Image
        src={brand.image}
        alt={brand.name}
        width={200}
        height={200}
        className="object-contain max-h-full"
      />
       </div>

        <div className="bg-emerald-500 py-2 text-center font-semibold text-white">
        {brand.name}
        </div>
        </Link>
         ))}
        </div>
      </div>
    </div>
  );
}
