"use client";
import Image from "next/image";
import { useState } from "react";

import { GoHeart, GoHeartFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";

const detailImages = [
  "/detail1.png",
  "/detail2.png",
  "/detail3.png",
  "/detail4.png",
];
const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
export const ProductDetail = (index: number) => {
  const [currentImage, setCurrentImage] = useState(detailImages[0]);
  const [hiddenElement, setHiddenElement] = useState(false);
  const [count, setCount] = useState(0);
  const [hearts, setHearts] = useState<{ [index: number]: boolean }>({});
  const toggleHeart = (index: number) => {
    setHearts((prevHearts) => ({
      ...prevHearts,
      [index]: !prevHearts[index],
    }));
  };
  const [bgColor, setBgColor] = useState(0);

  return (
    <div>
      <div className="max-w-screen-xl m-auto mt-[52px]">
        <div className="flex items-start  justify-center gap-[20px]">
          <div className="pt-[100px] flex flex-col gap-2 ">
            {detailImages.map((item, index) => (
              <div key={index}>
                <Image
                  className={`rounded-md cursor-pointer ${
                    currentImage === item ? "border border-black" : ""
                  }`}
                  src={item}
                  alt=""
                  width={67}
                  height={67}
                  onClick={() => setCurrentImage(item)}
                />
              </div>
            ))}
          </div>
          <div className="w-[422px] h-[521px] relative">
            <Image
              className="rounded-2xl"
              style={{ objectFit: "cover" }}
              src={currentImage}
              fill
              alt=""
            />
          </div>
          <div>
            <div className="pt-[100px] flex flex-col gap-6">
              <div>
                <div className="flex flex-col gap-2">
                  <div className="py-[2px] px-[10px] rounded-full border w-fit font-semibold border-[#2563EB]">
                    ШИНЭ
                  </div>
                  <div className="flex gap-2">
                    <div>Wildflower Hoodie</div>
                    <div onClick={() => toggleHeart(index)}>
                      {hearts[index] ? (
                        <GoHeartFill size={24} />
                      ) : (
                        <GoHeart size={24} />
                      )}
                    </div>
                  </div>
                  <div>Зэрлэг цэцгийн зурагтай даавуун материалтай цамц</div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="underline">Хэмжээний заавар</div>
                  <div className="flex gap-1">
                    {sizes.map((size, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setBgColor(index)}
                          className={`flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black cursor-pointer hover:bg-slate-300 ${
                            bgColor === index ? "bg-black text-white " : ""
                          }`}
                        >
                          {size}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
                    onClick={() =>
                      setCount((prev) => (prev > 0 ? prev - 1 : 0))
                    }
                  >
                    -
                  </div>
                  <div>{count}</div>
                  <div
                    className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black"
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    +
                  </div>
                </div>
              </div>
              <div>
                <div className="font-bold text-[20px] pb-2">120,000₮</div>
                <button className="text-white bg-[#2563EB] py-2 px-9 rounded-full">
                  Сагсанд нэмэх
                </button>
              </div>
              <div>
                <div className="flex gap-4">
                  <div>Үнэлгээ</div>
                  <div
                    onClick={() => {
                      setHiddenElement(!hiddenElement);
                    }}
                    className="cursor-pointer underline text-[#2563EB]"
                  >
                    {hiddenElement ? "Бүгдийг хураах" : "Бүгдийг харах"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                    <CiStar />
                  </div>
                  <div className="font-bold">4.7</div>
                </div>
              </div>
              <div className={`${hiddenElement ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-6 bg-gray-100 rounded-lg p-6">
                  <div>
                    <div>Одоор үнэлэх:</div>
                    <div className="flex">
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </div>
                  </div>
                  <div className="flex gap-6 flex-col">
                    <div>Сэтгэгдэл үлдээх:</div>
                    <div className="w-full">
                      <input
                        className="border w-full h-[94px] rounded-lg"
                        placeholder="Энд бичнэ үү"
                      />
                    </div>
                    <button className="bg-[#2563EB] w-fit text-white py-2 px-9 rounded-full">
                      Үнэлэх
                    </button>
                  </div>
                </div>
                <div className="border-gray-200 border-b border-dashed pt-6 pb-[21px]">
                  <div className="flex items-center gap-2">
                    <div>Saraa lav bish</div>
                    <div className="flex">
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </div>
                  </div>
                  <div>Ваав материал ёстой гоё байна 😍</div>
                </div>
                <div className="border-gray-200 border-b border-dashed pt-6 pb-[21px]">
                  <div className="flex items-center gap-2">
                    <div>Saraag samarna</div>
                    <div className="flex">
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </div>
                  </div>
                  <div>Ваав материал ёстой гоё байна 😍</div>
                </div>
                <div className="border-gray-200 border-b border-dashed pt-6 pb-[21px]">
                  <div className="flex items-center gap-2">
                    <div>Saraa bitch!</div>
                    <div className="flex">
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </div>
                  </div>
                  <div>Ваав материал ёстой гоё байна 😍</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
