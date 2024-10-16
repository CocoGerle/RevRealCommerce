"use client";
import { api } from "@/components/lib/axios";
import { UserContext } from "@/components/utils/context";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface Order {
  userName: string;
  createdAt: Date;
  _id: string;
  status: string;
  phoneNumber: string;
  address: string;
  product: [];
  paid: number;
}

interface OrderItem {
  productId: Product; // Reference to the Product
  qty: number; // Quantity of the product
}

interface Product {
  _id: string; // Assuming there's an ID for the product
  productName: string;
  price: number;
  images: string[]; // Array of image URLs
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hideOrder, setHideOrder] = useState<boolean[]>([]);

  const userContext = useContext(UserContext);

  const { user } = userContext || {};

  const getOrders = async () => {
    try {
      const response = await api.get(`/order/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId: user?.id },
      });
      setOrders(response.data.orders);
      setHideOrder(new Array(response.data.orders.length).fill(true));
      //   console.log(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user?.id) {
  //     getOrders();
  //   } else return;
  // }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      getOrders(); // Only calls getOrders if user.id is available
    }
  }, [user?.id]); // Hook itself is still unconditional

  if (!userContext) {
    return <div>Loading...</div>;
  }
  const toggleOrder = (index: number) => {
    setHideOrder((prev) => {
      const newHideOrder = [...prev];
      newHideOrder[index] = !newHideOrder[index];
      return newHideOrder;
    });
  };

  return (
    <div className="bg-[#f7f7f7] min-h-[66vh] ">
      <div className="flex gap-5 max-w-screen-lg m-auto pt-[104px] ">
        <div className="w-[244px]">
          <Link href={`/userInfo`}>
            <div className="py-2 px-4">Хэрэглэгчийн хэсэг</div>
          </Link>
          <div className="bg-white py-2 px-4 rounded-2xl">Захиалгын түүх</div>
        </div>
        <div>
          <div className="w-[620px] ">
            <h1 className="text-[#09090B] text-[18px] font-bold border-b-2 border-[#E4E4E7] pb-5">
              Захиалгын түүх
            </h1>
            <div className="w-full py-2 ">
              <div className="py-2 bg-[#F4F4F5E5] rounded-2xl">
                <div className="py-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-6 pb-6">
                    <div className="flex flex-col gap-4 bg-[#F4F4F5E5] rounded-2xl">
                      {orders.length === 0 ? (
                        <div>Захиалга байхгүй</div>
                      ) : (
                        orders.map((order, orderIndex) => (
                          <div
                            key={orderIndex}
                            className="py-8 px-6 bg-white rounded-xl"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <div className="font-bold">
                                  {new Date(order.createdAt).toLocaleString()}
                                </div>
                                <div className="text-white bg-[#2563EB] text-sm rounded-full py-[2px] px-[10px]">
                                  {order.status}
                                </div>
                              </div>
                              <div
                                onClick={() => toggleOrder(orderIndex)}
                                className="cursor-pointer"
                              >
                                {hideOrder[orderIndex] ? "▼" : "▲"}
                              </div>
                            </div>
                            <div
                              className={`py-4 flex flex-col gap-4 ${
                                hideOrder[orderIndex] ? "hidden" : ""
                              } border-gray-300 border-dashed border-b`}
                            >
                              {order?.product?.map(
                                (item: OrderItem, itemIndex: number) => (
                                  <div
                                    key={itemIndex}
                                    className="flex gap-2 items-center w-full"
                                  >
                                    <div className="relative w-9 h-11">
                                      <Image
                                        src={
                                          item?.productId?.images[0] ||
                                          "/detail2.png"
                                        }
                                        alt={
                                          item?.productId?.productName ||
                                          "Sorry"
                                        }
                                        fill
                                        className="rounded-xl"
                                      />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                      <div className="flex flex-col">
                                        <div className="pb-1">
                                          {item?.productId?.productName}
                                        </div>
                                        <div>
                                          {item.qty} x{" "}
                                          {item?.productId?.price
                                            ? item?.productId?.price.toLocaleString()
                                            : order.paid}{" "}
                                          ₮
                                        </div>
                                      </div>
                                      <div className="font-bold">
                                        {item?.productId?.price * item.qty}₮
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="flex justify-between pt-4">
                              <div>Үнийн дүн:</div>
                              <div className="font-bold">
                                {order.paid.toLocaleString()} ₮
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
