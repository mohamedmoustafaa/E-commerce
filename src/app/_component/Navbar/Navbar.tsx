"use client";
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import { CartContext } from '@/context/CartIconCounter';
import { WishlistContext } from '@/context/WishlistIconCounter'; 

export default function Navbar() {
 const cartContext = useContext(CartContext);
const numberOfCartIcon = cartContext?.numberOfCartIcon ?? 0;

  const wishlistContext = useContext(WishlistContext); 
  const { numberOfWishlistIcon } = wishlistContext || { numberOfWishlistIcon: 0 };

  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") return null;

  function logOut() {
    signOut({
      callbackUrl: "/login"
    });
  }

  return (
    <nav className="bg-gray-100 border-gray-200 fixed top-0 left-0 z-50 w-full dark:bg-gray-900">
      <div className="container w-full lg:w-[80%]  mx-auto p-4 flex justify-between items-center">
        
        {/* Left Section */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/" className="text-2xl font-semibold flex items-center gap-2 text-emerald-600">
            <i className="fa-solid fa-cart-shopping"></i> Cartify
          </Link>

          {/* Hamburger Icon (mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 hover:text-emerald-600 focus:outline-none text-2xl lg:hidden"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {/* Center + Right Menu (Desktop) */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Center Links */}
          <ul className='flex gap-6 items-center ml-6'>
            <li><Link className='text-gray-600 hover:text-emerald-600' href="/">Home</Link></li>
            <li><Link className='text-gray-600 hover:text-emerald-600' href="/Cart">Cart</Link></li>
            <li><Link className='text-gray-600 hover:text-emerald-600' href="/Wishlist">Wish List</Link></li>
            <li><Link className='text-gray-600 hover:text-emerald-600' href="/Products">Products</Link></li>
            <li><Link className='text-gray-600 hover:text-emerald-600' href="/Categoris">Categories</Link></li>
            <li><Link className='text-gray-600 hover:text-emerald-600' href="/Brand">Brands</Link></li>
          </ul>

          {/* Right Section */}
          <ul className='flex gap-6 items-center'>
            {!session ? (
             

              <li className='flex gap-4'>
                <Link href="/login" className='text-gray-600 hover:text-emerald-600'>Login</Link>
                <Link href="/register" className='text-gray-600 hover:text-emerald-600'>Sign Up</Link>
                </li>
            ) : (
              <>
                <li className="text-2xl relative">
                  <Link href="/Wishlist">
                    <i className="fa-solid fa-heart text-gray-600 hover:text-emerald-600"></i>
                    {numberOfWishlistIcon > 0 && (
                      <span className="absolute top-[-10px] end-[-10px] flex size-5 rounded-full bg-emerald-600 text-white justify-center items-center text-sm">
                        {numberOfWishlistIcon}
                      </span>
                    )}
                  </Link>
                </li>

                {/* Cart Icon  */}
                <li className='text-2xl relative'>
                  <Link href="/Cart">
                    <i className="text-gray-600 hover:text-emerald-600 fa-solid fa-cart-shopping"></i>
                    {numberOfCartIcon > 0 && (
                      <span className='absolute top-[-10px] end-[-10px] flex size-5 rounded-full bg-emerald-600 text-white justify-center items-center text-sm'>
                        {numberOfCartIcon}
                      </span>
                    )}
                  </Link>
                </li>

                <li>
                  <span onClick={logOut} className='text-gray-600 hover:text-emerald-600 cursor-pointer'>Logout</span>
                </li>

                {session && (
                  <li className='text-gray-600 hover:text-emerald-600'>
                    <span>Hi {session?.user.name}</span>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden w-full mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
            <ul className="flex flex-col gap-3">
              <li><Link onClick={() => setMenuOpen(false)} className='text-gray-700 hover:text-emerald-600' href="/">Home</Link></li>
              <li><Link onClick={() => setMenuOpen(false)} className='text-gray-700 hover:text-emerald-600' href="/Cart">Cart</Link></li>
              <li><Link onClick={() => setMenuOpen(false)} className='text-gray-700 hover:text-emerald-600' href="/Wishlist">Wish List</Link></li>
              <li><Link onClick={() => setMenuOpen(false)} className='text-gray-700 hover:text-emerald-600' href="/Products">Products</Link></li>
              <li><Link onClick={() => setMenuOpen(false)} className='text-gray-700 hover:text-emerald-600' href="/Categoris">Categories</Link></li>
              <li><Link onClick={() => setMenuOpen(false)} className='text-gray-700 hover:text-emerald-600' href="/Brand">Brands</Link></li>

              {!session ? (
                <li><Link href="/register" className='text-gray-700 hover:text-emerald-600'>Sign Up</Link></li>
              ) : (
                <>
                  <li>
                    <span onClick={() => { logOut(); setMenuOpen(false) }} className='text-gray-700 hover:text-emerald-600 cursor-pointer'>
                      Logout
                    </span>
                  </li>
                  <li className='text-gray-700'>Hi {session?.user.name}</li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
