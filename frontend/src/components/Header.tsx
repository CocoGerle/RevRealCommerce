"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { UserContext } from "./utils/context";
import { api } from "./lib/axios";
import { useCart } from "./utils/CartProvider";

interface Product {
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
}

export const Header = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { user, LogOut } = userContext;

  const { cart = [] } = useCart(); // Ensure cart is an array
  const userId = user?.id;
  const userCart = cart.filter((item) => item.userId === userId);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  // const [isDropdownVisible, setIsDropdownVisible] = useState(true);

  const getProducts = async () => {
    try {
      const response = await api?.get("/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data.allProducts);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (search.length > 0 && products) {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [search, products]);

  // console.log(products);

  return (
    <header className="bg-black py-[16px] px-[24px] flex justify-between text-white">
      <div className="flex gap-[16px] items-center">
        <Link href={`/`}>
          <div className="flex items-center gap-[6px]">
            <Image
              width={32}
              height={32}
              src={"/Pinecone.png"}
              alt="Pinecone logo"
            />
            <p>ECOMMERCE</p>
          </div>
        </Link>
        <Link href={`/category`}>
          <p>Ангилал</p>
        </Link>
      </div>
      <div className="relative w-[601px]">
        <div className=" w-full flex items-center justify-center">
          <input
            className="pl-20 bg-[#18181B] py-2 px-4 rounded-md outline-none w-[300px]"
            placeholder="Бүтээгдэхүүн хайх"
            onChange={(event) => setSearch(event?.target.value)}
            value={search}
          />
          <FiSearch className="absolute w-6 h-6 top-2 left-48 text-[#9ca3ab]" />
        </div>
        {filteredProducts.length === 0 && search && (
          <div className="absolute bg-white text-black w-full mt-1 p-2 shadow-md rounded-lg z-20">
            No products found
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="absolute bg-white text-black w-full mt-1 max-h-64 overflow-y-auto shadow-md rounded-lg z-20">
            {filteredProducts.map((product) => (
              <Link
                href={`/${product._id}`}
                key={product._id}
                onClick={() => setSearch("")}
              >
                <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-10 h-10 object-cover rounded mr-2"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{product.productName}</span>
                    <span className="text-gray-500">${product.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-[24px] items-center">
        <Link href={`/saved`}>
          <div className="relative h-6">
            <div
              className={`${
                user?.savedProduct?.length
                  ? "absolute left-3.5 bottom-4 bg-[#2563EB] text-white rounded-full text-[10px] w-4 h-4 flex justify-center items-center"
                  : "hidden"
              }   `}
            >
              {user?.savedProduct?.length}
            </div>
            <FiHeart size={24} />
          </div>
        </Link>
        <Link href={`/buysteps/cart`}>
          <div className="relative h-6">
            <div
              className={`${
                userCart?.length
                  ? "absolute left-3.5 bottom-4 bg-[#2563EB] text-white rounded-full text-[10px] w-4 h-4 flex justify-center items-center"
                  : "hidden"
              }   `}
            >
              {userCart?.length}
            </div>
            <FiShoppingCart size={24} />
          </div>
        </Link>
        <Link href={`/userInfo`}>
          <FiUser size={24} />
        </Link>
        <div className={user ? "hidden" : `flex gap-2 items-center`}>
          <Link href={`/register`}>
            <button className="border border-[#2563EB] w-[110px] rounded-3xl py-[8px] px-[12px] ">
              Бүртгүүлэх
            </button>
          </Link>
          <Link href={`/login`}>
            <button className="border border-[#2563EB] rounded-3xl w-[101px] py-[8px] px-[12px]">
              Нэвтрэх
            </button>
          </Link>
        </div>
        <Link href={`/`}>
          <div onClick={LogOut} className={user ? "" : "hidden"}>
            log out
          </div>
        </Link>
      </div>
    </header>
  );
};
