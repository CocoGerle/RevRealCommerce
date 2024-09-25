"use client";

import { createContext, useState, ReactNode, FC, useEffect } from "react";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

interface User {
  name: string;
  email: string;
  id: string;
  savedProduct: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  LogOut: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const LogOut = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
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
    <UserContext.Provider value={{ user, setUser, LogOut }}>
      {children}
    </UserContext.Provider>
  );
};
