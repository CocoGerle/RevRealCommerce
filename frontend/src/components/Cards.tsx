"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { UserContext } from "./utils/context";
import { api } from "./lib/axios";

interface MyComponentProps {
  images: string[];
  productName: string;
  price: number;
  customHeight: string;
  index: number;
  id: string;
}

export const Cards: React.FC<MyComponentProps> = ({
  images = [],
  productName,
  price,
  customHeight,
  index,
  id,
}) => {
  const [hearts, setHearts] = useState<{ [index: number]: boolean }>({});
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;

  const toggleHeart = async (index: number) => {
    setHearts((prevHearts) => ({
      ...prevHearts,
      [index]: !prevHearts[index],
    }));
    try {
      const response = await api?.post("http://localhost:3001/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(" error");
      console.log(error);
    }
  };

  console.log(hearts);
  return (
    <div>
      <div
        className="relative w-[100%] overflow-hidden rounded-2xl"
        style={{ height: customHeight }}
      >
        <Link href={`${id}`}>
          <Image
            fill
            alt="card"
            src={images[0]}
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 transform hover:scale-150"
          />
        </Link>
        <div
          onClick={() => toggleHeart(index)}
          className="absolute right-4 top-4 cursor-pointer"
        >
          {hearts[index] ? <GoHeartFill size={24} /> : <GoHeart size={24} />}
        </div>
      </div>
      <div>
        <p>{productName}</p>
        <p className="font-bold">{price.toLocaleString()}₮</p>
      </div>
    </div>
  );
};
