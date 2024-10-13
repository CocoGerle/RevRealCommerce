// "use client";
// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { UserContext } from "./context";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export type Product = {
//   _id: string;
//   productName: string;
//   categoryId: string[];
//   price: number;
//   size: string[];
//   qty: number;
//   images: string[];
//   thumbnils: string[];
//   salePercent: number;
//   description: string;
//   reviewCount: number;
//   averageRating: number;
// };

// type CartProduct = {
//   product: Product;
//   quantity: number;
//   selectedSize: string;
//   userId: string;
//   price: number;
// };

// type CartContextType = {
//   cart: CartProduct[];
//   setCart: (cart: CartProduct[]) => void;
//   addProductToCart: (product: Product, size: string, quantity: number) => void;
//   removeProductFromCart: (
//     product: Product,
//     size: string,
//     quantity: number
//   ) => void;
//   increaseProductQuantity: (
//     product: Product,
//     size: string,
//     quantity: number
//   ) => void;
//   decreaseProductQuantity: (
//     product: Product,
//     size: string,
//     quantity: number
//   ) => void;
//   clearCart: () => void;
// };

// const CartContext = createContext<CartContextType>({} as CartContextType);

// export const CartProvider = ({ children }: PropsWithChildren) => {
//   const userContext = useContext(UserContext);
//   if (!userContext) {
//     return <div>Loading...</div>;
//   }
//   const { user } = userContext || { user: null };

//   // let localCart;
//   // if (typeof window !== "undefined") {
//   //   localCart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
//   // }

//   let localCart: CartProduct[] = [];
//   if (typeof window !== "undefined") {
//     localCart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
//   }

//   const [cart, setCart] = useState<CartProduct[]>(localCart);

//   const isAuthenticated = () => {
//     const token = localStorage.getItem("token");
//     return !!token;
//   };

//   const addProductToCart = (
//     product: Product,
//     size: string,
//     quantity: number
//   ) => {
//     const userId = user?.id;
//     if (!userId || !isAuthenticated()) {
//       alert("Please log in to add products to the cart.");
//       return;
//     }
//     const existingProduct = cart.find(
//       (p) =>
//         p.product._id === product._id &&
//         p.userId === userId &&
//         p.selectedSize === size
//     );
//     if (existingProduct) {
//       increaseProductQuantity(product, size);
//     } else {
//       setCart((prevCart) => [
//         ...prevCart,
//         {
//           product,
//           quantity,
//           userId,
//           selectedSize: size,
//           price: product.price,
//         },
//       ]);
//     }
//     toast.success("Бүтээгдэхүүнийг сагсанд амжилттай нэмлээ.");
//   };

//   const removeProductFromCart = (product: Product, size: string) => {
//     const userId = user?.id;
//     if (!userId || !isAuthenticated()) {
//       alert("Please log in to remove products from the cart.");
//       return;
//     }
//     setCart(
//       cart.filter(
//         (p) =>
//           p.product._id !== product._id ||
//           p.userId !== userId ||
//           p.selectedSize !== size
//       )
//     );
//   };

//   const increaseProductQuantity = (product: Product, size: string) => {
//     const userId = user?.id;
//     if (!userId || !isAuthenticated()) {
//       alert("Please log in to update product quantity.");
//       return;
//     }
//     setCart((prevCart) =>
//       prevCart.map((p) =>
//         p.product._id === product._id &&
//         p.userId === userId &&
//         p.selectedSize === size
//           ? { ...p, quantity: p.quantity + 1 } // Increase the quantity by 1
//           : p
//       )
//     );
//   };

//   const decreaseProductQuantity = (product: Product, size: string) => {
//     const userId = user?.id;
//     if (!userId || !isAuthenticated()) {
//       alert("Please log in to update product quantity.");
//       return;
//     }
//     const existingProduct = cart.find(
//       (p) =>
//         p.product._id === product._id &&
//         p.userId === userId &&
//         p.selectedSize === size
//     );
//     if (existingProduct?.quantity === 1) {
//       removeProductFromCart(product, size);
//     } else {
//       setCart(
//         cart.map((p) =>
//           p.product._id === product._id &&
//           p.userId === userId &&
//           p.selectedSize === size
//             ? { ...p, quantity: p.quantity - 1 }
//             : p
//         )
//       );
//     }
//   };
//   const clearCart = () => {
//     setCart([]);
//   };

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   if (!userContext) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         setCart,
//         addProductToCart,
//         removeProductFromCart,
//         increaseProductQuantity,
//         decreaseProductQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

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
  price: number;
};

type CartContextType = {
  cart: CartProduct[];
  setCart: (cart: CartProduct[]) => void;
  addProductToCart: (product: Product, size: string, quantity: number) => void;
  removeProductFromCart: (
    product: Product,
    size: string,
    quantity: number
  ) => void;
  increaseProductQuantity: (
    product: Product,
    size: string,
    quantity: number
  ) => void;
  decreaseProductQuantity: (
    product: Product,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const userContext = useContext(UserContext);
  const { user } = userContext || { user: null };

  // Load the cart from localStorage at the top level
  const localCart: CartProduct[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]") || []
      : [];

  const [cart, setCart] = useState<CartProduct[]>(localCart);

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const addProductToCart = (
    product: Product,
    size: string,
    quantity: number
  ) => {
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
      setCart((prevCart) => [
        ...prevCart,
        {
          product,
          quantity,
          userId,
          selectedSize: size,
          price: product.price,
        },
      ]);
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
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.product._id === product._id &&
        p.userId === userId &&
        p.selectedSize === size
          ? { ...p, quantity: p.quantity + 1 } // Increase the quantity by 1
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

  // Always call useEffect at the top level
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Conditional rendering based on userContext
  if (!userContext) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
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
