import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import AddBtn from '../Addbtn/AddBtn'
import AddWishlist from '../AddToWishlist/page'
import { ProductType } from '@/Types/Product.t'

export default function SingleProducts({ product }: { product: ProductType }) {
  return (
    <div className="product p-4">
      <Card className="gap-2 p-2 relative overflow-hidden">
        <div className="relative">
          <AddWishlist id={product._id} />

          <Link href={`/Products/${product._id}`}>
            <Image
              src={product.imageCover}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded relative z-10"
            />
          </Link>
        </div>

        <CardHeader>
          <CardDescription className="text-emerald-500">
            {product.category.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="font-bold">
          <p className="line-clamp-2">{product.title}</p>
        </CardContent>

        <CardFooter>
          <div className="flex justify-between w-full">
            <span>{product.price} EGP</span>
            <span>
              {product.ratingsAverage}{' '}
              <i className="fas fa-star text-yellow-500"></i>
            </span>
          </div>
        </CardFooter>

        <AddBtn id={product._id} />
      </Card>
    </div>
  )
}
