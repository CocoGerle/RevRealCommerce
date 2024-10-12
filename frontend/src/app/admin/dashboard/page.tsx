"use client";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/components/lib/axios";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Product {
  images: string[];
  productName: string;
  price: number;
  categoryId: string[];
  soldCount: number;
  _id: string;
}
interface Order {
  firstName: string;
  createdAt: string;
  _id: string;
  status: string;
  products: { price: number; soldCount: number }[];
  paid: number;
}

const Dashboard = () => {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalSoldCount, setTotalSoldCount] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);

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
  const sortedProducts = allProducts?.sort((a, b) => b.soldCount - a.soldCount);

  const getOrders = async () => {
    try {
      const res = await api.get(`/order/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { admin: "admin" },
      });
      setOrders(res.data.orders);

      const generatedData = generateChartData(res.data.orders);
      setChartData(generatedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  useEffect(() => {
    const todayOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      const today = new Date();

      return (
        orderDate.getFullYear() === today.getFullYear() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getDate() === today.getDate()
      );
    });
    console.log(todayOrders);

    const todayTotalIncome =
      todayOrders.reduce((total, order) => {
        return total + order.paid;
      }, 0) || 0;

    const todayTotalSoldCount = todayOrders.length;

    setTotalIncome(todayTotalIncome);
    setTotalSoldCount(todayTotalSoldCount);
  }, [orders]);

  const generateChartData = (orders: Order[]) => {
    const today = new Date();

    const lastFiveDays = Array.from({ length: 5 }, (_, i) => {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      return day.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
    });

    const data = lastFiveDays.map((day) => {
      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const orderDateString = orderDate.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        });

        return orderDateString === day;
      });

      const totalIncome = dayOrders.reduce((total, order) => {
        const paidAmount = Number(order.paid);
        return total + (isNaN(paidAmount) ? 0 : paidAmount);
      }, 0);

      return { month: day, desktop: totalIncome };
    });

    return data.reverse();
  };

  const chartConfig = {
    desktop: {
      label: "Орлого",
      color: "black",
    },
  } satisfies ChartConfig;

  return (
    <div className="bg-[#1C20240A]">
      <div className="w-[985px] m-auto flex">
        <div className="flex flex-col gap-[50px] w-full  px-6 py-6">
          <div className="flex gap-6 w-full">
            <div className="flex-1 flex flex-col bg-white rounded-xl px-6 py-4">
              <div className="flex gap-2 font-semibold">
                <div>₮</div>
                <div>Орлого</div>
              </div>
              <div className="font-bold text-[32px]">
                {totalIncome.toLocaleString()}₮
              </div>
              <div className="text-[#5E6166]">Өнөөдөр</div>
            </div>
            <div className="flex-1 flex flex-col bg-white rounded-xl px-6 py-4">
              <div className="flex gap-2 font-semibold">
                <div>₮</div>
                <div>Захиалга</div>
              </div>
              <div className="font-bold text-[32px]">{totalSoldCount}</div>
              <div className="text-[#5E6166]">Өнөөдөр</div>
            </div>
          </div>
          <div className="flex gap-6 w-full">
            <div className="flex-1 rounded-xl px-6 py-4 bg-white">
              <div className="flex items-center w-full justify-between pb-5">
                <div className="font-semibold text-[18px]">
                  Шилдэг бүтээгдэхүүн
                </div>
                <FaArrowRight />
              </div>
              <div className="flex w-full items-center bg-[#ECEDF0] py-2">
                <div className="w-[10%] text-center">№</div>
                <div className="w-[50%] text-center">Бүтээгдэхүүн</div>
                <div className="w-[20%] text-center">Зарагдсан</div>
                <div className="w-[20%] text-center">Үнэ</div>
              </div>
              <div>
                {sortedProducts?.slice(0, 6).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex py-4 items-center border-b"
                    >
                      <div className="w-[10%] text-center">{index + 1}</div>
                      <div className="w-[50%] text-center flex justify-center gap-5">
                        <div className="relative w-10 h-10">
                          <Image
                            alt=""
                            fill
                            src={item.images[0]}
                            className="rounded-full object-cover "
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="font-semibold">
                            {item.productName}
                          </div>
                          <div className="text-[#3F4145]">
                            #{item._id.slice(0, 6)}
                          </div>
                        </div>
                      </div>
                      <div className="w-[20%] text-center">
                        {item.soldCount}
                      </div>
                      <div className="w-[20%] text-center">
                        {item.price.toLocaleString()}₮
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 rounded-xl px-6 py-4 bg-white">
              <div className="flex items-center w-full justify-between pb-5"></div>
              <Card>
                <CardHeader>
                  <CardTitle>Борлуулалт</CardTitle>
                  <FaArrowRight />
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 6)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Bar
                        dataKey="desktop"
                        fill="var(--color-desktop)"
                        radius={8}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
