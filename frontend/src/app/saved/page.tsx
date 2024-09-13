"use client";
import { ProductContext } from "@/components/utils/context";
import Image from "next/image";
import { useContext, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const Saved = () => {
  const context = useContext(ProductContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { product } = context;
  const [hearts, setHearts] = useState<{ [index: number]: boolean }>({});
  const toggleHeart = (index: number) => {
    setHearts((prevHearts) => ({
      ...prevHearts,
      [index]: !prevHearts[index],
    }));
  };
  return (
    <div className=" bg-[#f7f7f7] min-h-[66vh]">
      <div className="pt-[52px] w-[622px] m-auto">
        <h1 className="text-[20px] font-bold text-[#121316] mb-4">
          Хадгалсан бараа (3)
        </h1>
        <div className="flex flex-col gap-4">
          {product.slice(0, 3).map((item, index) => {
            return (
              <div key={index}>
                <div className="flex gap-6 border p-4 rounded-2xl bg-[#FFFFFF] relative">
                  <div className="w-[100px] h-[100px] relative rounded-2xl overflow-hidden">
                    <Image
                      style={{ objectFit: "cover" }}
                      src={item.img}
                      fill
                      alt=""
                    />
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p className="font-bold">{item.price.toLocaleString()}₮</p>
                    <button className="py-[4px] px-[12px] bg-[#2563EB] text-white rounded-2xl mt-2">
                      Сагслах
                    </button>
                  </div>
                  <div
                    onClick={() => toggleHeart(index)}
                    className="absolute right-4 top-4 cursor-pointer"
                  >
                    {hearts[index] ? (
                      <GoHeart size={24} />
                    ) : (
                      <GoHeartFill size={24} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Saved;
