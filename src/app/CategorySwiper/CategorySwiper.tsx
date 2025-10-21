"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import { CategoryType } from '@/Types/Category.t';
import Image from 'next/image';

export default function CategorySwiper( {data} : {data: CategoryType[]} ) {
    
  return <>
  <div className='w-full mx-auto'>
    <Swiper
      spaceBetween={0}
      slidesPerView={7}
       modules={[Autoplay]}
       autoplay = {{delay : 2000}}
      
    >
      {data.map((category: CategoryType)=> <SwiperSlide key={category._id}>
          <Image width={200} height={400}  src={category.image} className='h-[150px] w-full object-cover' alt='test'/>
          <p className='text-center font-bold'>{category.name}</p>
      </SwiperSlide>
    
    )}
      
    </Swiper>  
  </div>
  </>
}
