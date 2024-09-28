"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { UserContext } from "./utils/context";

export const Header = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user, LogOut } = userContext;
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
      <div className="bg-[#18181B] flex gap-2 items-center py-[8px] px-[16px] rounded-md w-[300px]">
        <FiSearch size={24} />

        <input
          placeholder="Бүтээгдэхүүн  хайх"
          type="search"
          className="bg-transparent text-[#71717A]"
        />
      </div>
      <div className="flex gap-[24px] items-center">
        <Link href={`saved`}>
          <div className="relative h-6">
            <div
              className={`${
                user?.savedProduct.length
                  ? "absolute left-3.5 bottom-4 bg-[#2563EB] text-white rounded-full text-[10px] w-4 h-4 flex justify-center items-center"
                  : "hidden"
              }   `}
            >
              {user?.savedProduct.length}
            </div>
            <FiHeart size={24} />
          </div>
        </Link>
        <FiShoppingCart size={24} />
        <Link href={`userInfo`}>
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
