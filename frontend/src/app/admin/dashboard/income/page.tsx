"use client";
import { api } from "@/components/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
  _id: string;
  soldCount: number;
}

interface Order {
  userName: string;
  createdAt: string;
  _id: string;
  status: string;
  paid: number;
}
const Income = () => {
  const [totalIncome, setTotalIncome] = useState<number | undefined>(undefined);
  const [allProducts, setAllProducts] = useState<Product[] | undefined>(
    undefined
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [timeFrame, setTimeFrame] = useState<string | undefined>(undefined);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/product/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllProducts(response.data.allProducts);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  const getOrders = async () => {
    try {
      const res = await api.get(`/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { admin: "admin" },
      });
      setOrders(res.data.orders);
      console.log(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const now = new Date();

      let matchesTimeFrame = true;

      if (timeFrame === "Today") {
        matchesTimeFrame = orderDate.toDateString() === now.toDateString();
      } else if (timeFrame === "7 Days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        matchesTimeFrame = orderDate >= sevenDaysAgo && orderDate <= now;
      } else if (timeFrame === "This Month") {
        matchesTimeFrame =
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear();
      }

      return matchesTimeFrame;
    });
    setFilteredOrders(filtered);
  }, [orders, timeFrame]);

  useEffect(() => {
    const totalIncome =
      filteredOrders?.reduce((total, order) => {
        return total + order.paid;
      }, 0) || 0;

    setTotalIncome(totalIncome);
  }, [filteredOrders]);

  return (
    <div className="bg-[#1C20240A]">
      <div className="w-[985px] m-auto flex">
        <div className="w-3/5 m-auto">
          <div className="w-full bg-white rounded-lg">
            <div className="flex justify-between p-6 border-b">
              <div className="font-bold text-xl">Орлого</div>
            </div>
            <div className="flex justify-between items-center p-6 font-semibold text-xl">
              <div className="font-bold text-3xl">
                {totalIncome?.toLocaleString()}₮
              </div>
              <div className="flex gap-2 text-[14px]">
                <button
                  className={`px-4 py-[6px] border rounded-[8px] cursor-pointer ${
                    timeFrame === "Today" ? "bg-green-500 " : " bg-white"
                  } `}
                  onClick={() => setTimeFrame("Today")}
                >
                  Өнөөдөр
                </button>
                <button
                  className={` px-4 py-[10px] border rounded-[8px] cursor-pointer ${
                    timeFrame === "7 days" ? "bg-green-500 " : " bg-white"
                  } `}
                  onClick={() => setTimeFrame("7 days")}
                >
                  7 хоног
                </button>
                <div
                  className={` px-4 py-[10px] border rounded-[8px] cursor-pointer ${
                    timeFrame === "This month" ? "bg-green-500 " : " bg-white"
                  } `}
                  onClick={() => setTimeFrame("This month")}
                >
                  Сараар
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg mt-4 overflow-hidden">
            <div className="flex w-full items-center border-b py-[14px] px-3 justify-between">
              <div className="w-[25%] text-center">Захиалгын дугаар</div>
              <div className="w-[25%] text-center">Үйлчлүүлэгч</div>
              <div className="w-[25%] text-center">Төлбөр</div>
              <div className="w-[25%] text-center">Огноо</div>
            </div>
            <div className="flex flex-col bg-white">
              {filteredOrders.map((order, index) => {
                return (
                  <div
                    className="flex justify-between w-full py-4 items-center px-3 border-b"
                    key={index}
                  >
                    <div className="w-[25%] text-center">
                      #{order._id.slice(0, 6)}
                    </div>
                    <div className="w-[25%] text-center">
                      <div>{order.userName}</div>
                    </div>

                    <div className="w-[25%] text-center">
                      {order?.paid?.toLocaleString()}₮
                    </div>

                    <div className="w-[25%] text-center">
                      {new Date(order.createdAt).toLocaleString(undefined, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Income;
