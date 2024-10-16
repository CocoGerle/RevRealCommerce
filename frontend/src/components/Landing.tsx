"use client";
import Image from "next/image";
import { Cards } from "./Cards";
import React, { useEffect, useState } from "react";
import { api } from "./lib/axios";
import Link from "next/link";

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
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      setProducts(response.data.allProducts);
      // console.log(response.data.allProducts);
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
        <Link href={`${products[5]?._id}`}>
          <div className="w-[100%] h-[446px] ">
            <Image
              src={products[5]?.images[0]}
              alt="hoodie image"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 transform hover:scale-150"
            />
          </div>
        </Link>
        <div className="absolute bottom-8 left-8">
          <p className="text-[18px] font-normal">{products[5]?.productName}</p>
          <p className="text-[36px] font-bold">
            {products[5]?.price.toLocaleString()}₮
          </p>
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
