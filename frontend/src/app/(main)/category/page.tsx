"use client";
import { Cards } from "@/components/Cards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { api } from "@/components/lib/axios";
import { ProductContext } from "@/components/utils/context";
import { useContext, useEffect, useState } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await api?.get(`/category/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(response.data.categories);
      console.log(response.data.categories);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const context = useContext(ProductContext);
  if (!context) {
    return <div>Loading...</div>;
  }
  const { products } = context;
  return (
    <div>
      <div className="w-[1280px] m-auto flex justify-around pt-12 pb-24">
        <div className="flex flex-col gap-12  pr-40">
          <div>
            <div className="font-bold">Ангилал</div>
            <div className="flex flex-col gap-2 pt-4">
              {categories.map((category, index) => (
                <div key={index}>{category?.name}</div>
              ))}
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
          {products.map((item, index) => {
            return (
              <div key={index}>
                <Cards
                  images={item.images}
                  productName={item.productName}
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
