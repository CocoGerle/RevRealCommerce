"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "./context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  selectedSize: string;
  userId: string;
};

type CartContextType = {
  cart: CartProduct[];
  addProductToCart: (product: Product, size: string) => void;
  removeProductFromCart: (product: Product, size: string) => void;
  increaseProductQuantity: (product: Product, size: string) => void;
  decreaseProductQuantity: (product: Product, size: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { user } = userContext;

  let localCart;
  if (typeof window !== "undefined") {
    localCart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
  }

  const [cart, setCart] = useState<CartProduct[]>(localCart);

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const addProductToCart = (product: Product, size: string) => {
    const userId = user?.id;
    if (!userId || !isAuthenticated()) {
      alert("Please log in to add products to the cart.");
      return;
    }
    const existingProduct = cart.find(
      (p) =>
        p.product._id === product._id &&
        p.userId === userId &&
        p.selectedSize === size
    );
    if (existingProduct) {
      increaseProductQuantity(product, size);
    } else {
      setCart([...cart, { product, quantity: 1, userId, selectedSize: size }]);
    }
    toast.success("Бүтээгдэхүүнийг сагсанд амжилттай нэмлээ.");
  };

  const removeProductFromCart = (product: Product, size: string) => {
    const userId = user?.id;
    if (!userId || !isAuthenticated()) {
      alert("Please log in to remove products from the cart.");
      return;
    }
    setCart(
      cart.filter(
        (p) =>
          p.product._id !== product._id ||
          p.userId !== userId ||
          p.selectedSize !== size
      )
    );
  };

  const increaseProductQuantity = (product: Product, size: string) => {
    const userId = user?.id;
    if (!userId || !isAuthenticated()) {
      alert("Please log in to update product quantity.");
      return;
    }
    setCart(
      cart.map((p) =>
        p.product._id === product._id &&
        p.userId === userId &&
        p.selectedSize === size
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const decreaseProductQuantity = (product: Product, size: string) => {
    const userId = user?.id;
    if (!userId || !isAuthenticated()) {
      alert("Please log in to update product quantity.");
      return;
    }
    const existingProduct = cart.find(
      (p) =>
        p.product._id === product._id &&
        p.userId === userId &&
        p.selectedSize === size
    );
    if (existingProduct?.quantity === 1) {
      removeProductFromCart(product, size);
    } else {
      setCart(
        cart.map((p) =>
          p.product._id === product._id &&
          p.userId === userId &&
          p.selectedSize === size
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
      );
    }
  };
  const clearCart = () => {
    setCart([]);
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
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
