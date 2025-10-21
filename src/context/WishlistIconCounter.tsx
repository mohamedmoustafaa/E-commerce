"use client";

import GetLoggedWishlistUser from "@/app/WishlistAction/GetLoggedUserWishList";
import React, { createContext, useEffect, useState, ReactNode } from "react";

interface WishlistContextType {
  numberOfWishlistIcon: number;
  setNumberOfWishlistIcon: React.Dispatch<React.SetStateAction<number>>;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistContextProviderProps {
  children: ReactNode;
}

export default function WishlistContextProvider({ children }: WishlistContextProviderProps) {
  const [numberOfWishlistIcon, setNumberOfWishlistIcon] = useState<number>(0);

  async function getUserWishlist() {
    try {
      const res = await GetLoggedWishlistUser();

      if (res.status === "success") {
        setNumberOfWishlistIcon(res.data.length); 
      }
    } catch  {  
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ numberOfWishlistIcon, setNumberOfWishlistIcon }}>
      {children}
    </WishlistContext.Provider>
  );
}
