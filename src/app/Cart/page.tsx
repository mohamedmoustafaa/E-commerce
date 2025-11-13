"use client";
import ChangeQuantity from "@/CartActions/ChangeQuantity";
import DeleteCart from "@/CartActions/DeleteCart";
import getLoggedUserCart from "@/CartActions/GetCart.Action";
import RemoveItems from "@/CartActions/RemoveItems";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartIconCounter";
import { CartProductType } from "@/Types/Cart.t";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function Cart() {
  const [products, setproducts] = useState([]);
  const [isLoading, setloading] = useState(true);
  const [updateDisabled, setupdateDisabled] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const { numberOfCartIcon, setnumberOfCartIcon } = useContext(CartContext)!;
  const [price, setprice] = useState("");
  const [cartId, setcartId] = useState("");

  async function gerUsserCart() {
    try {
      const res = await getLoggedUserCart();

      if (res.status === "success") {
        setprice(res.data.totalCartPrice);
        setproducts(res.data.products);
        setloading(false);
        setcartId(res.data._id);
      }
    } catch (err) {
      setloading(false);
    }
  }

  async function deleteProduct(id: string) {
    const res = await RemoveItems(id);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Product has been deleted successfully", {
        position: "top-center",
        duration: 2000,
      });
      let sum = 0;
      res.data.products.forEach((product: CartProductType) => {
        sum += product.count;
      });
      gerUsserCart();
      setnumberOfCartIcon(sum);
    } else {
      toast.error("Can't delete this product !!", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  async function UpdateCart(id: string, count: string, sign: string) {
    setupdateDisabled(true);
    setloadingUpdate(true);
    setcurrentId(id);
    const res = await ChangeQuantity(id, count);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Quantity Updated successfully", {
        position: "top-center",
        duration: 2000,
      });
      gerUsserCart();
      setupdateDisabled(false);
      setloadingUpdate(false);
    }
    if (sign === "+") {
      setnumberOfCartIcon(numberOfCartIcon + 1);
    } else if (sign === "-") {
      setnumberOfCartIcon(numberOfCartIcon - 1);
    } else {
      toast.error("Can't Change Count!!!", {
        position: "top-center",
        duration: 2000,
      });
      setupdateDisabled(false);
      setloadingUpdate(false);
    }
  }

  async function clear() {
    const res = await DeleteCart();
    if (res.message === "success") {
      setproducts([]);
      setnumberOfCartIcon(0);
    }
  }

  useEffect(() => {
    gerUsserCart();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="pt-16 w-[95%] sm:w-[90%] md:w-4/5 lg:w-2/3 mx-auto my-6">
          <div className="shadow-md sm:rounded-lg p-2 sm:p-4 bg-white">
            <h1 className="text-2xl sm:text-3xl text-center font-bold my-4">
              Total price : {price} EGP
            </h1>

            
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: CartProductType) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <Image
                          src={product.product.imageCover}
                          alt={product.product.title}
                          width={100}
                          height={100}
                          className="object-contain rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {product.product.title}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <button
                            disabled={updateDisabled}
                            onClick={() =>
                              UpdateCart(
                                product.product.id,
                                String(product.count - 1),
                                "-"
                              )
                            }
                            className="p-1 me-3 h-6 w-6 border rounded-full hover:bg-gray-100"
                          >
                            <svg
                              className="w-3 h-3"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <span>{product.count}</span>
                          <button
                            disabled={updateDisabled}
                            onClick={() =>
                              UpdateCart(
                                product.product.id,
                                String(product.count + 1),
                                "+"
                              )
                            }
                            className="p-1 ms-3 h-6 w-6 border rounded-full hover:bg-gray-100"
                          >
                            <svg
                              className="w-3 h-3"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {product.price * product.count} EGP
                      </td>
                      <td className="px-4 py-3">
                        <span
                          onClick={() => deleteProduct(product.product.id)}
                          className="font-medium text-red-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ======= Cards for mobile ======= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-4">
              {products.map((product: CartProductType) => (
                <div
                  key={product._id}
                  className="bg-gray-50 p-4 rounded-lg shadow border"
                >
                  <Image
                    src={product.product.imageCover}
                    alt={product.product.title}
                    width={200}
                    height={200}
                    className="w-full h-40 object-contain rounded-md"
                  />
                  <h2 className="font-semibold mt-2 text-gray-800 line-clamp-2">
                    {product.product.title}
                  </h2>
                  <p className="font-bold text-emerald-600">
                    {product.price * product.count} EGP
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <button
                        disabled={updateDisabled}
                        onClick={() =>
                          UpdateCart(
                            product.product.id,
                            String(product.count - 1),
                            "-"
                          )
                        }
                        className="border rounded-full p-1 h-6 w-6 flex items-center justify-center"
                      >
                        <span>-</span>
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        disabled={updateDisabled}
                        onClick={() =>
                          UpdateCart(
                            product.product.id,
                            String(product.count + 1),
                            "+"
                          )
                        }
                        className="border rounded-full p-1 h-6 w-6 flex items-center justify-center"
                      >
                        <span>+</span>
                      </button>
                    </div>
                    <span
                      onClick={() => deleteProduct(product.product.id)}
                      className="text-red-500 text-sm cursor-pointer"
                    >
                      Remove
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href={`/Checkout/${cartId}`}>
            <Button className="w-full my-4 cursor-pointer bg-emerald-600 hover:bg-emerald-700">
              Checkout Now!
            </Button>
          </Link>
          <Button
            onClick={() => clear()}
            className="w-full my-3 cursor-pointer bg-red-600 hover:bg-red-700"
          >
            Clear Cart
          </Button>
        </div>
      ) : (
        <h1 className=" pt-16 font-bold text-3xl text-center my-12">
          No products to show!!!
        </h1>
      )}
    </>
  );
}
