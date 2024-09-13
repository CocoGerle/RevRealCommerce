"use client";

import { createContext, useState, ReactNode, FC } from "react";

interface Product {
  img: string;
  title: string;
  price: number;
}

interface ProductContextType {
  product: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductContext = createContext<ProductContextType | null>(null);

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContextProvider: FC<ProductContextProviderProps> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product[]>([
    { img: "/image.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image1.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image2.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image3.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image1.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image2.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image3.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image1.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image2.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image3.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image1.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image2.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image3.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image.png", title: "Wildflower hoodie", price: 120000 },
    { img: "/image1.png", title: "Wildflower hoodie", price: 120000 },
  ]);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
