import Image from "next/image";
import Link from "next/link";

export const AdminNavbar = () => {
  return (
    <div className="bg-black">
      <div className="w-[1280px] py-4 px-6 m-auto flex text-[#FFFFFF] justify-between items-center">
        <div className="flex gap-4">
          <Link href={`/`}>
            <div>
              <Image src={`/Pinecone.png`} alt="Hello" width={32} height={32} />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6">
            <div>ADMIN</div>
          </div>
          <div className="flex gap-2"></div>
        </div>
      </div>
    </div>
  );
};
