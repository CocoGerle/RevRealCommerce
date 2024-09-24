"use client";
import { Cards } from "@/components/Cards";
import { api } from "@/components/lib/axios";
import { useEffect, useState } from "react";

// Define the types
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

// Available sizes
const sizes = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[] | undefined>();
  const [products, setProducts] = useState<ProductType[]>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("All");

  // Fetch categories from the backend
  const getCategories = async () => {
    try {
      const response = await api.get(`/category/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products from the backend, filtered by category and size
  const getProducts = async () => {
    try {
      const categoryQuery =
        selectedCategoryId.length > 0
          ? `categoryId=${selectedCategoryId.join(",")}`
          : "";
      const sizeQuery = selectedSize !== "All" ? `&size=${selectedSize}` : "";
      const query = `?${categoryQuery}${sizeQuery}`;

      const response = await api.get(`/product${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProducts(response.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial load of categories
  useEffect(() => {
    getCategories();
  }, []);

  // Update products when category or size changes
  useEffect(() => {
    getProducts();
  }, [selectedCategoryId, selectedSize]);

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
                  onClick={() =>
                    setSelectedCategoryId(
                      (prev) =>
                        prev.includes(category._id)
                          ? prev.filter((id) => id !== category._id) // Remove if already selected
                          : [...prev, category._id] // Add if not selected
                    )
                  }
                  key={category._id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategoryId.includes(category._id)}
                    onChange={() => {}} // Checkbox click handled by parent div onClick
                  />{" "}
                  <label className="text-[#09090B] text-[14px]">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Size Section */}
          <div>
            <div className="font-bold">Хэмжээ</div>
            <div className="flex flex-col gap-2 pt-4">
              {sizes.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id={`size-${item}`}
                    name="size"
                    value={item}
                    checked={selectedSize === item}
                    onChange={() => setSelectedSize(item)}
                  />
                  <label className="text-[#09090B] text-[14px]">{item}</label>
                </div>
              ))}
              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="size-all"
                  name="size"
                  value="All"
                  checked={selectedSize === "All"}
                  onChange={() => setSelectedSize("All")}
                />
                <label className="text-[#09090B] text-[14px]">All Sizes</label>
              </div>
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
                id={item._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
