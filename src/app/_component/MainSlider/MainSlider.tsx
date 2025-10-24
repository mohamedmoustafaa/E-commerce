"use client";
import Image from "next/image";
import React from "react";
import slider1 from "../../../../public/images/slider1.jpeg";
import slider3 from "../../../../public/images/slider3.jpeg";
import slider4 from "../../../../public/images/slider4.jpeg";
import images4 from "../../../../public/images/images.jpeg";
import images5 from "../../../../public/images/download.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function MainSlider() {
  return (
    <div className="w-[95%] sm:w-[85%] md:w-[80%] lg:w-[70%] mx-auto my-4 flex flex-col md:flex-row gap-2 md:gap-0">
      {/* القسم الرئيسي للسلايدر */}
      <div className="w-full md:w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          <SwiperSlide>
            <Image
              alt=""
              src={slider1}
              className="w-full object-cover h-[200px] sm:h-[300px] md:h-[400px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt=""
              src={slider4}
              className="w-full object-cover h-[200px] sm:h-[300px] md:h-[400px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt=""
              src={slider3}
              className="w-full object-cover h-[200px] sm:h-[300px] md:h-[400px]"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* الصور الجانبية */}
      <div className="w-full md:w-1/3 flex md:flex-col gap-2 md:gap-0 mt-2 md:mt-0">
        <Image
          alt=""
          src={images4}
          className="w-1/2 md:w-full object-cover h-[150px] sm:h-[180px] md:h-[200px]"
        />
        <Image
          alt=""
          src={images5}
          className="w-1/2 md:w-full object-cover h-[150px] sm:h-[180px] md:h-[200px]"
        />
      </div>
    </div>
  );
}
