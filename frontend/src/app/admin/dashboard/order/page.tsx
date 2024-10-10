"use client";
import { api } from "@/components/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  userName: string;
  createdAt: string;
  _id: string;
  status: string;
  userId: string;
  phoneNumber: string;
  paid: number;
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [timeFrame, setTimeFrame] = useState<string | undefined>(undefined);

  const getOrders = async (status: string | undefined) => {
    try {
      const params = status ? { status } : {};
      const res = await api.get(`/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params,
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await api.put(
        `/order/update`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { orderId, newStatus },
        }
      );
      // Update the order status in the state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    getOrders(status);
  }, [status]);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.userName &&
        order.userName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status ? order.status === status : true;

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

      return matchesSearch && matchesStatus && matchesTimeFrame;
    });
    setFilteredOrders(filtered);
  }, [search, orders, status, timeFrame]);

  return (
    <div className="bg-[#1C20240A] h-fit">
      <div className="w-[985px] m-auto flex">
        <div className="w-full">
          <div className="flex border-b w-full">
            <div
              className={`py-3 px-4 cursor-pointer ${
                status === undefined ? "bg-[#ebedf1]" : ""
              }`}
              onClick={() => setStatus(undefined)}
            >
              Бүгд
            </div>
            <div
              className={`py-3 px-4 cursor-pointer ${
                status === "Ordered" ? "bg-[#ebedf1]" : ""
              }`}
              onClick={() => setStatus("Ordered")}
            >
              Ordered
            </div>
            <div
              className={`py-3 px-4 cursor-pointer ${
                status === "Shipped" ? "bg-[#ebedf1]" : ""
              }`}
              onClick={() => setStatus("Shipped")}
            >
              Shipped
            </div>
            <div
              className={`py-3 px-4 cursor-pointer ${
                status === "Delivered" ? "bg-[#ebedf1]" : ""
              }`}
              onClick={() => setStatus("Delivered")}
            >
              Delivered
            </div>
          </div>
          <div className="flex justify-between py-6 px-4">
            <div className="flex gap-2 ">
              <button
                className={` px-4 py-[10px] border rounded-[8px] cursor-pointer ${
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
            <div>
              <input
                placeholder="Үйлчлүүлэгчийн нэр"
                className="bg-white rounded-lg px-4 py-[10px] border mr-2"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="border rounded-[12px] overflow-hidden mx-6">
            <div className="text-[20xp] font-semibold px-6 py-5 bg-white">
              Захиалга
            </div>
            <div>
              <div className="flex w-full items-center bg-[#ECEDF0] py-[14px] px-3 justify-between">
                <div className="w-[20%] text-center">Захиалгын дугаар</div>
                <div className="w-[20%] text-center">Үйлчлүүлэгч</div>
                <div className="w-[15%] text-center">Огноо</div>
                <div className="w-[15%] text-center">Цаг</div>
                <div className="w-[10%] text-center">Төлбөр</div>
                <div className="w-[15%] text-center">Статус</div>
                <div className="w-[15%] text-center">Дэлгэрэнгүй</div>
              </div>
              <div className="flex flex-col">
                {filteredOrders.map((item) => {
                  const date = new Date(item.createdAt).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  );
                  const time = new Date(item.createdAt).toLocaleTimeString(
                    undefined,
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }
                  );
                  return (
                    <div
                      className="flex justify-between w-full py-4 items-center px-3 border-b"
                      key={item._id}
                    >
                      <div className="w-[20%] text-center">
                        {item._id.slice(15)}
                      </div>
                      <div className="w-[20%] text-center">
                        <div className="font-bold">{item.userName}</div>
                        <div>{item.phoneNumber}</div>
                      </div>
                      <div className="w-[15%] text-center">{date}</div>
                      <div className="w-[15%] text-center">{time}</div>
                      <div className="w-[10%] text-center">
                        {item.paid.toLocaleString()}₮
                      </div>
                      <div className="w-[15%] text-center">
                        <Select
                          onValueChange={(newStatus) =>
                            handleStatusChange(item._id, newStatus)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={item.status} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ordered">Ordered</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Link href={`${item._id}`} className="w-[15%]">
                        <div className="w-full flex justify-center">
                          <FaArrowRight />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
