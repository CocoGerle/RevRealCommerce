"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "./context";

export type Product = {
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
};

type CartProduct = {
  product: Product;
  quantity: number;
  userId: string; // Ensure to include userId
};

type CartContextType = {
  cart: CartProduct[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (product: Product) => void;
  increaseProductQuantity: (product: Product) => void;
  decreaseProductQuantity: (product: Product) => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { user } = userContext; // Get user from context

  const [cart, setCart] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem("cart") || "[]") || []
  );

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // Check if token exists
  };

  const addProductToCart = (product: Product) => {
    const userId = user?.id;
    if (!userId || !isAuthenticated()) {
      alert("Please log in to add products to the cart.");
      return;
    }
    const existingProduct = cart.find(
      (p) => p.product._id === product._id && p.userId === userId
    );
    if (existingProduct) {
      increaseProductQuantity(product);
    } else {
      setCart([...cart, { product, quantity: 1, userId }]); // Add userId here
    }
  };

  const removeProductFromCart = (product: Product) => {
    const userId = user?.id;
    if (!userId || !isAuthenticated()) {
      alert("Please log in to remove products from the cart.");
      return;
    }
    setCart(
      cart.filter((p) => p.product._id !== product._id || p.userId !== userId)
    );
  };

  const increaseProductQuantity = (product: Product) => {
    const userId = user?.id;
    if (!userId || !isAuthenticated()) {
      alert("Please log in to update product quantity.");
      return;
    }
    setCart(
      cart.map((p) =>
        p.product._id === product._id && p.userId === userId
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const decreaseProductQuantity = (product: Product) => {
    const userId = user?.id;
    if (!userId || !isAuthenticated()) {
      alert("Please log in to update product quantity.");
      return;
    }
    const existingProduct = cart.find(
      (p) => p.product._id === product._id && p.userId === userId
    );
    if (existingProduct?.quantity === 1) {
      removeProductFromCart(product);
    } else {
      setCart(
        cart.map((p) =>
          p.product._id === product._id && p.userId === userId
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
