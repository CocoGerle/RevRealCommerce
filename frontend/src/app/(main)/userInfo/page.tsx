"use client";
import { api } from "@/components/lib/axios";
import { UserContext, UserContextType } from "@/components/utils/context";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserInfo = () => {
  const userContext = useContext(UserContext);
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const { user, setUser, getUser } = userContext as UserContextType;

  useEffect(() => {
    if (user) {
      setUserName(user.name || "");
      setAddress(user.address || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
    }
    setIsLoading(false);
  }, [user]);

  const updateUser = async () => {
    try {
      const updatedUser = {
        userName,
        phoneNumber,
        email,
        address,
      };
      const response = await api.put(`/users/update`, updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data.user);
      toast.success(response.data.message);
      getUser();
    } catch (error) {
      console.log(error);
      toast.error("Хэрэглэгч мэдээллээ өөрчлөхөд алдаа гарлаа");
    }
  };

  if (!userContext) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f7f7f7] min-h-[66vh]">
      <div className="flex gap-5 max-w-screen-lg m-auto pt-[104px]">
        <div className="w-[244px]">
          <div className="bg-white py-2 px-4 rounded-2xl">
            Хэрэглэгчийн хэсэг
          </div>
          <Link href={`/orderHistory`}>
            <div className="py-2 px-4">Захиалгын түүх</div>
          </Link>
        </div>
        <div>
          <div className="w-[620px]">
            <h1 className="text-[#09090B] text-[18px] font-bold border-b-2 border-[#E4E4E7] pb-5">
              Хэрэглэгчийн хэсэг
            </h1>
            <div>
              {user ? <p>Сайн байна уу, {user?.name}!</p> : <p>Нэвтэрнэ үү</p>}
            </div>
            <div className="flex flex-col gap-4">
              <div className="mt-5">
                <p>Нэр: </p>
                <input
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div>
                <p>Утасны дугаар:</p>
                <input
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <p>Имэйл хаяг:</p>
                <input
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <p>Хаяг</p>
                <input
                  className="rounded-2xl w-[100%] h-32 py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className=" flex justify-end mt-4">
              <button
                className="text-white bg-[#2563EB] py-2 px-9 rounded-full"
                onClick={updateUser}
              >
                Мэдээлэл шинэчлэх
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
