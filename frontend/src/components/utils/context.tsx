"use client";

import { createContext, useState, ReactNode, FC, useEffect } from "react";
import axios from "axios";
import { api } from "../lib/axios";

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

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider: FC<ProductContextProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const getProducts = async () => {
    try {
      const response = await api?.get("/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data.products);
      console.log(response.data.products);
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
