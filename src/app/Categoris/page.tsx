"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { CategoryType } from "@/Types/Category.t";
import GetAllCategory from "@/api/GetAllCategory.api";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GetAllCategory();
        if (res && Array.isArray(res)) {
          setCategories(res);
        } else {
          setCategories([]);
        }
      } catch  {
        
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="group"
          >
            <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-0 bg-transparent">
              <CardContent className="p-0">
                <div className="relative h-64 w-full">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                  {/* Title Background */}
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-center py-2">
                    <h3 className="text-white font-semibold text-lg">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
