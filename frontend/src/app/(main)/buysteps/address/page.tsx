"use client";

import { api } from "@/components/lib/axios";
import { useCart } from "@/components/utils/CartProvider";
import { UserContext } from "@/components/utils/context";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Address = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addInfo, setAddInfo] = useState<string>("");

  // Context from UserContext
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { user, getUser, setUser } = userContext;

  // Cart state
  const { cart, clearCart } = useCart();
  const userId = user?.id;
  const userCart = cart.filter((item) => item.userId === userId);

  // Calculate total price
  const totalPrice = userCart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Create an order
  const createOrder = async () => {
    const orderProducts = userCart.map((item) => {
      return {
        productId: item.product._id,
        qty: item.quantity,
        size: item.selectedSize,
      };
    });
    try {
      const response = await api.post(
        `/order`,
        {
          product: orderProducts,
          userId: user?.id,

          userName: userName,
          phoneNumber: phoneNumber,
          address: address,
          addInfo: addInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      clearCart();
      router.push("pay");
      toast.success("Order created successfully.");

      console.log(response);
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create an order."
      );
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user?.userName);
      setAddress(user?.address);
      setPhoneNumber(user?.phoneNumber);
    }
  }, [user]);

  return (
    <div>
      <div className="w-[1280px] m-auto">
        <div>
          <div className="flex items-center w-fit m-auto pt-7">
            <div className="py-2 px-2 text-white bg-black border border-black rounded-full"></div>
            <div className="w-20 h-[1px] bg-black"></div>
            <div className="py-1 px-3 border border-black rounded-full">2</div>
            <div className="w-20 h-[1px] bg-black"></div>
            <div className="py-1 px-3 border border-black rounded-full">3</div>
          </div>
        </div>
        <div className="flex py-[50px] gap-5">
          <div className="flex flex-col gap-4 bg-gray-100 rounded-xl px-6 py-8 w-fit">
            <div>
              <div className="flex gap-1 pb-6">
                <div>Сагс </div>
                <div>({userCart.length})</div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-6 border-b pb-6 border-gray-300 border-dashed">
                {userCart.map((item, index) => {
                  const productPrice = item.product.price * item.quantity;
                  return (
                    <div key={index} className="flex justify-between gap-6">
                      <div className="relative h-20 w-40">
                        <Image
                          alt=""
                          fill
                          src={item.product.images[0]}
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-between w-full">
                        <div>
                          <div className="pb-1">{item.product.productName}</div>
                          <div>size: {item.selectedSize}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div>{item.quantity}</div>
                          <div>x</div>
                          <div>{item.product.price.toLocaleString()}₮</div>
                        </div>
                        <div className="font-bold">
                          {productPrice.toLocaleString()}₮
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Үнийн дүн:</div>

              <div className="font-bold text-[20px]">
                {totalPrice.toLocaleString()}₮
              </div>
            </div>
          </div>
          <div className="p-8 bg-gray-100 rounded-xl w-full flex flex-col gap-9 ">
            <div className="font-bold text-[18px]">
              2. Хүргэлтийн мэдээлэл оруулах
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <div>Нэр:</div>
                <input
                  id="firstname"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                />
              </div>
              <div>
                <div>Утасны дугаар:</div>
                <input
                  id="phonenumber"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  value={phoneNumber}
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                />
              </div>
              <div>
                <div>Хаяг:</div>
                <input
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                />
              </div>
              <div>
                <div>Нэмэлт мэдээлэл:</div>
                <input
                  id="addInfo"
                  value={addInfo}
                  onChange={(event) => setAddInfo(event.target.value)}
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                />
                <div className="text-[12px]">
                  Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
                </div>
              </div>
              <div className="flex justify-between">
                <button className="py-2 px-9 rounded-full border bg-white">
                  Буцах
                </button>

                <button
                  className="py-2 px-9 rounded-full bg-[#2563EB] text-white"
                  onClick={createOrder}
                >
                  Төлбөр төлөх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Address;
