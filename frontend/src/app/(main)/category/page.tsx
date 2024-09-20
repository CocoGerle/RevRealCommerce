"use client";
import { Cards } from "@/components/Cards";
import { api } from "@/components/lib/axios";
import { useEffect, useState } from "react";

// Define the type for categories
type CategoryType = {
  name: string;
  _id: string;
};

type ProductType = {
  _id: string;
  productName: string;
  categoryId: string[];
  price: number;
  size: string[];
  qty: number;
  images: string[];
  thumbnils: string[];
  salePercent: number;
  description: string;
  reviewCount: number;
  averageRating: number;
};

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[] | undefined>();
  const [products, setProducts] = useState<ProductType[]>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const getCategories = async () => {
    try {
      const response = await api.get(`/category/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(response.data.categories);
      console.log(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (categoryId?: string) => {
    try {
      const url = categoryId ? `/product?categoryId=${categoryId}` : `/product`;
      const response = await api?.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      getProducts(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  return (
    <div>
      <div className="w-[1280px] m-auto flex justify-around pt-12 pb-24">
        {/* Categories Section */}
        <div className="flex flex-col gap-12 pr-40">
          <div>
            <div className="font-bold">Ангилал</div>
            <div className="flex flex-col gap-2 pt-4">
              {categories?.map((category) => (
                <div
                  onClick={() => setSelectedCategoryId(category._id)}
                  key={category._id}
                  className="cursor-pointer"
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          {/* Size Section */}
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

        {/* Products Section */}
        <div className="h-[2147px] w-[774px] grid grid-cols-3 grid-rows-5 gap-x-5 gap-y-12">
          {products?.map((item, index) => (
            <div key={index}>
              <Cards
                images={item.images}
                productName={item.productName}
                price={item.price}
                customHeight="290px"
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
