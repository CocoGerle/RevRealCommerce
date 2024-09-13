"use client";
import Image from "next/image";
import { Cards } from "./Cards";
import React, { useContext } from "react";
import { ProductContext } from "./utils/context";
import Link from "next/link";

export const Landing = () => {
  const context = useContext(ProductContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { product } = context;

  return (
    <div className="mb-[87px]">
      <div className="border max-w-screen-xl m-auto relative rounded-2xl overflow-hidden mt-[56px] mb-[32px]">
        <div className="w-[100%] h-[446px] ">
          <Image
            src="/WildFlower.png"
            alt="hoodie image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="absolute bottom-8 left-8">
          <p className="text-[18px] font-normal">Wildflower Hoodie</p>
          <p className="text-[36px] font-bold">120'000</p>
        </div>
      </div>
      <div className="max-w-screen-xl m-auto grid grid-cols-4 grid-rows-6 gap-x-5 gap-y-8 [&>div:nth-child(7)]:col-span-2 [&>div:nth-child(7)]:row-span-2 [&>div:nth-child(8)]:row-span-2 [&>div:nth-child(8)]:col-span-2">
        {product.map((item, index) => {
          const customHeight =
            index === 6 ? "764px" : index === 7 ? "764px" : "331px";
          return (
            <div key={index}>
              <Link href={`detail`}>
                <Cards
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  customHeight={customHeight}
                  index={index}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
