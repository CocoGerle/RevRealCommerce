"use client";

import { createContext, useState, ReactNode, FC, useEffect } from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

interface User {
  name: string;
  email: string;
  id: string;
  savedProduct: Product[];
  address: string;
  phoneNumber: string;
}
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

export interface UserContextType {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  LogOut: () => void;
  getUser: () => void;
}

// export const UserContext = createContext<UserContextType>(
//   {} as UserContextType
// );

export const UserContext = createContext<UserContextType | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const getUser = async () => {
    try {
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const LogOut = async () => {
    try {
      localStorage.removeItem("token");
      setUser(undefined);
      toast.success("You have been logged out successfully.");
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Log out failed.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, LogOut, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
