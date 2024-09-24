"use client";
import Image from "next/image";
import { Cards } from "./Cards";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./utils/context";
import Link from "next/link";
import { api } from "./lib/axios";

interface Product {
  _id: string;
  productName: string;
  categoryId: string[];
  price: number;
  size: string[];
  qty: number;
  images: string[];
  thumbnils: string[];
  salePercent: number;
  description: string;
  reviewCount: number;
  averageRating: number;
}

export const Landing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = async () => {
    try {
      const response = await api?.get("/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data.allProducts);
      console.log(response.data.allProducts);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
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
        {products?.map((item, index) => {
          const customHeight =
            index === 6 ? "764px" : index === 7 ? "764px" : "331px";
          return (
            <div key={index}>
              {/* <Link href={`${item._id}`}> */}
              <Cards
                images={item.images}
                productName={item.productName}
                price={item.price}
                customHeight={customHeight}
                index={index}
                id={item._id}
              />
              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
