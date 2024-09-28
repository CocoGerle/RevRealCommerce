"use client";
import { api } from "@/components/lib/axios";
import { UserContext } from "@/components/utils/context";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const Saved = () => {
  const [hearts, setHearts] = useState<{ [index: number]: boolean }>({});
  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  const toggleHeart = async (index: number, id: string) => {
    setHearts((prevHearts) => ({
      ...prevHearts,
      [index]: !prevHearts[index],
    }));

    if (user) {
      try {
        const response = await api.post(
          "http://localhost:3001/users",
          {
            userId: user.id,
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        getUser(); // Refresh user data after the operation
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  useEffect(() => {
    if (user && user.savedProduct) {
      user.savedProduct.forEach((item, index) => {
        const isLiked = item._id ? true : false; // Check if _id exists, it means it's liked
        setHearts((prevHearts) => ({
          ...prevHearts,
          [index]: isLiked,
        }));
      });
    }
  }, [user]);

  return (
    <div className="min-h-[70vh] bg-[#F7F7F8]">
      <div className="w-[1280px] m-auto">
        <div className="w-3/5 m-auto pt-[80px]">
          <div className="flex gap-1 text-[20px]">
            <div className="pb-4 font-bold">Хадгалсан бараа</div>
            <div>({user?.savedProduct.length})</div>
          </div>
          <div className="flex flex-col gap-4  ">
            {user?.savedProduct.map((item, index) => (
              <div
                key={item._id}
                className="flex justify-between gap-6 bg-white rounded-2xl relative p-4"
              >
                <div className="relative h-[100px] w-[100px]">
                  <Image
                    alt={item.productName}
                    fill
                    src={item.images[0]}
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="flex flex-col w-full justify-around">
                  <div>{item.productName}</div>
                  <div className="font-bold">
                    {item.price.toLocaleString()}₮
                  </div>
                  <button className="bg-[#2563EB] w-fit text-white py-2 px-9 rounded-full">
                    Сагслах
                  </button>
                </div>
                <div
                  onClick={() => toggleHeart(index, item._id)}
                  className="absolute right-4 top-4 cursor-pointer"
                >
                  {hearts[index] ? (
                    <GoHeartFill size={24} />
                  ) : (
                    <GoHeart size={24} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;
