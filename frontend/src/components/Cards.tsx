"use client";
import Image from "next/image";
import React, { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface MyComponentProps {
  img: string;
  title: string;
  price: number;
  customHeight: string;
  index: number;
}

export const Cards: React.FC<MyComponentProps> = ({
  img,
  title,
  price,
  customHeight,
  index,
}) => {
  const [hearts, setHearts] = useState<{ [index: number]: boolean }>({});
  const toggleHeart = (index: number) => {
    setHearts((prevHearts) => ({
      ...prevHearts,
      [index]: !prevHearts[index],
    }));
  };

  return (
    <div>
      <div
        className="relative w-[100%] overflow-hidden rounded-2xl"
        style={{ height: customHeight }}
      >
        <Image
          fill
          alt="card"
          src={img}
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 transform hover:scale-150"
        />
        <div
          onClick={() => toggleHeart(index)}
          className="absolute right-4 top-4 cursor-pointer"
        >
          {hearts[index] ? <GoHeartFill size={24} /> : <GoHeart size={24} />}
        </div>
      </div>
      <div>
        <p>{title}</p>
        <p className="font-bold">{price.toLocaleString()}₮</p>
      </div>
    </div>
  );
};
