import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

export const Header = () => {
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
          <FiHeart size={24} />
        </Link>
        <FiShoppingCart size={24} />
        <Link href={`userInfo`}>
          <FiUser size={24} />
        </Link>
        <div className="flex gap-2">
          <button className="border border-[#2563EB] w-[101px] rounded-3xl ">
            Бүртгүүлэх
          </button>
          <button className="border border-[#2563EB] rounded-3xl w-[101px] py-[8px] px-[12px]">
            Нэвтрэх
          </button>
        </div>
      </div>
    </header>
  );
};
