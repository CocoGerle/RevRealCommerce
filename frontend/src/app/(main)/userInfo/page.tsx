"use client";
import { api } from "@/components/lib/axios";
import { UserContext } from "@/components/utils/context";
import { useContext, useEffect, useState } from "react";
type UserType = {
  name: string;
  phoneNumber: string;
  gmail: string;
  address: string;
};
const UserInfo = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user } = userContext;

  return (
    <div className="bg-[#f7f7f7] min-h-[66vh]">
      <div className="flex gap-5 max-w-screen-lg m-auto pt-[104px]">
        <div className="w-[244px]">
          <div>Хэрэглэгчийн хэсэг</div>
          <div>Захиалгын түүх</div>
        </div>
        <div>
          <div className="w-[620px]">
            <h1 className="text-[#09090B] text-[18px] font-bold border-b-2 border-[#E4E4E7] pb-5">
              Хэрэглэгчийн хэсэг
            </h1>
            <div>
              {user ? <p>Welcome, {user.name}!</p> : <p>Please log in.</p>}
            </div>
            <div className="flex flex-col gap-4">
              <div className="mt-5">
                <p>Нэр: </p>
                <input
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                  placeholder={user?.name}
                />
              </div>
              <div>
                <p>Утасны дугаар:</p>
                <input
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                  placeholder={user?.phoneNumber}
                />
              </div>
              <div>
                <p>Имэйл хаяг:</p>
                <input
                  className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                  placeholder={user?.email}
                />
              </div>
              <div>
                <p>Хаяг</p>
                <input
                  className="rounded-2xl w-[100%] h-32 py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]"
                  placeholder={user?.address}
                />
              </div>
            </div>
            <div className=" flex justify-end mt-4">
              <button className="text-white bg-[#2563EB] py-2 px-9 rounded-full">
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
