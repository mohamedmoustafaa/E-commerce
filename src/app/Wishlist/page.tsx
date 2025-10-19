"use client";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import GetLoggedWishlistUser from "../WishlistAction/GetLoggedUserWishList";
import RemoveWishlist from "../WishlistAction/RemoveProductFromWishlist";
import { Button } from "@/components/ui/button";
import { WishlistContext } from "@/context/WishlistIconCounter";
import Image from "next/image";

interface WishlistProduct {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
}

interface WishlistResponse {
  status: string;
  count?: number;
  data?: WishlistProduct[];
  message?: string;
}

export default function Wishlist() {
  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [updateDisabled, setUpdateDisabled] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");
  const {  setNumberOfWishlistIcon } = useContext(WishlistContext)!;

  const getUserWishlist = useCallback(async () => {
  try {
    const res: WishlistResponse = await GetLoggedWishlistUser();

    if (res.status === "success" && Array.isArray(res.data)) {
      setProducts(res.data);
      setNumberOfWishlistIcon(res.data.length);
    } else {
      setProducts([]);
      setNumberOfWishlistIcon(0);
    }
  } catch  {
    setProducts([]);
    setNumberOfWishlistIcon(0);
  } finally {
    setLoading(false);
  }
}, [setNumberOfWishlistIcon]); 

  async function deleteProduct(id: string) {
    setUpdateDisabled(true);
    setCurrentId(id);
    try {
      const res = await RemoveWishlist(id);

      if (res.status === "success") {
        setProducts((prev) => prev.filter((product) => product._id !== id));
        setNumberOfWishlistIcon((prev) => prev - 1);
        toast.success("Product removed from wishlist successfully", {
          position: "top-center",
          duration: 2000,
        });
      } else {
        toast.error(res.message || "Can't remove this product from wishlist!!", {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Error removing product from wishlist!!", {
        position: "top-center",
        duration: 2000,
      });
    } finally {
      setUpdateDisabled(false);
      setCurrentId("");
    }
  }

  useEffect(() => {
  getUserWishlist();
}, [getUserWishlist]);
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Wishlist
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <p className="text-xl text-gray-600 mb-6">Your wishlist is empty</p>
            <Link href="/Products">
              <Button className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors text-lg cursor-pointer">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-emerald-600 text-xl font-bold mb-4">
                    {product.price} EGP
                  </p>

                  <div className="flex justify-between items-center">
                    <Link href={`/Products/${product._id}`}>
                      <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">
                        View Details
                      </Button>
                    </Link>

                    <Button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer "
                      disabled={updateDisabled && currentId === product._id}
                    >
                      {updateDisabled && currentId === product._id ? "Removing..." : "Remove"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
