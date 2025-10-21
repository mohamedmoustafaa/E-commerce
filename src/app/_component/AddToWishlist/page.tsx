"use client";
import AddToWishlist from "@/app/WishlistAction/AddProductToWishlist";
import { WishlistContext } from "@/context/WishlistIconCounter";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddWishlist({ id }: { id: string }) {
  const { numberOfWishlistIcon, setNumberOfWishlistIcon } = useContext(WishlistContext)!;

  async function AddWishList(id: string) {
    const res = await AddToWishlist(id);

    if (res.status === "success") {
      toast.success("Product added to wishlist successfully", {
        position: "top-center",
        duration: 2000,
      });

      setNumberOfWishlistIcon(numberOfWishlistIcon + 1);
    } else {
      toast.error(res.message, { position: "top-center", duration: 2000 });
    }
  }

  return (
    <>
      <button
        onClick={() => AddWishList(id)}
        className="absolute top-3 right-3 z-20 text-gray-500 hover:text-emerald-600 text-2xl transition"
        aria-label="Add to wishlist"
      >
        <i className="fa-solid fa-heart"></i>
      </button>
    </>
  );
}
