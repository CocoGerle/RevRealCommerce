"use client";
import { Cards } from "@/components/Cards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductContext } from "@/components/utils/context";
import { useContext } from "react";

const Category = () => {
  const context = useContext(ProductContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { product } = context;
  return (
    <div>
      <div className="w-[1280px] m-auto flex justify-around pt-12 pb-24">
        <div className="flex flex-col gap-12  pr-40">
          <div>
            <div className="font-bold">Ангилал</div>
            <div className="flex flex-col gap-2 pt-4">
              <div>Малгай</div>
              <div>Усны сав</div>
              <div>T-shirt</div>
              <div>Hoodie</div>
              <div>Tee</div>
              <div>Цүнх</div>
            </div>
          </div>
          <div>
            <div className="font-bold">Хэмжээ</div>
            <div className="flex flex-col gap-2 pt-4">
              <div>Free</div>
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>2XL</div>
              <div>3XL</div>
            </div>
          </div>
        </div>
        <div className="h-[2147px] w-[774px] grid grid-cols-3 grid-rows-5 gap-x-5 gap-y-12">
          {product.map((item, index) => {
            return (
              <div key={index}>
                <Cards
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  customHeight="290px"
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
export default Category;
