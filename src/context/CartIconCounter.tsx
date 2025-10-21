"use client";

import getLoggedUserCart from "@/CartActions/GetCart.Action";
import React, { createContext, useEffect, useState, ReactNode } from "react";

interface CartContextType {
  numberOfCartIcon: number;
  setnumberOfCartIcon: React.Dispatch<React.SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartIcon, setnumberOfCartIcon] = useState<number>(0);

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();

      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumberOfCartIcon(sum);
      }
    } catch  {
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartIcon, setnumberOfCartIcon }}>
      {children}
    </CartContext.Provider>
  );
}
