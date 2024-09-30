"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { api } from "@/components/lib/axios";
import { UserContext } from "@/components/utils/context";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user, setUser } = userContext;

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); //Localstorage deer token-r SETelne./browser deer hadgalagdsn/
      setUser(response.data.user);
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[70vh] bg-[#F4F4F5]">
      <div className="w-[1280px] m-auto">
        <div className="flex flex-col w-2/3 m-auto gap-8 items-center pt-[100px]">
          <div className="font-semibold text-2xl">Нэвтрэх</div>
          <div className="flex flex-col gap-4 w-1/2">
            <input
              className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3
        "
              placeholder="Имэйл"
              name="name"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3
        "
              placeholder="Нууц үг"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 border w-full text-white bg-[#2563EB] rounded-full"
              onClick={() => login(email, password)}
            >
              Нэвтрэх
            </button>
            <Link href={`/forgotPassword`}>
              <div className="text-[#71717A] underline text-sm self-center">
                Нууц үг мартсан
              </div>
            </Link>
          </div>
          <div className="w-1/2">
            <Link href={`/register`}>
              <button className="px-4 py-2 border  border-[#2563EB] rounded-full w-full">
                Бүртгүүлэх
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
