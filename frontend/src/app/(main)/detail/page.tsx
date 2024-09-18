"use client";
import { Cards } from "@/components/Cards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductContext } from "@/components/utils/context";
import { useContext } from "react";

const Detail = () => {
  const context = useContext(ProductContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { product } = context;
  return (
    <div>
      <ProductDetail />
      <div className="mt-[80px] mb-[87px] max-w-screen-xl m-auto">
        <h1 className="text-[30px] font-bold mb-[24px]">Холбоотой бараа</h1>
        <div className="grid grid-cols-4 gap-x-5 gap-y-12">
          {product.slice(0, 8).map((item, index) => {
            const customHeight = "331px";
            return (
              <div key={index}>
                <Cards
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  customHeight={customHeight}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Detail;
