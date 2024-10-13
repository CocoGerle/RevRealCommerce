"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/components/utils/context";
import { useCart } from "@/components/utils/CartProvider";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";

const Cart = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext || {}; // Handle user being undefined

  // Always call hooks at the top level
  const {
    cart,
    removeProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCart();

  // Calculate user cart
  const userId = user?.id;
  const userCart = cart.filter((item) => item.userId === userId);

  // State for total price
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Calculate total price whenever userCart changes
  useEffect(() => {
    const total = userCart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [userCart]);

  // Loading state for user context
  if (!userContext) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-[1280px] m-auto pt-7 pb-[137px]">
        <div className="flex items-center w-fit m-auto">
          <div className="py-1 px-3 text-white bg-black border border-black rounded-full">
            1
          </div>
          <div className="w-20 h-[1px] bg-black"></div>
          <div className="py-1 px-3 border border-black rounded-full">2</div>
          <div className="w-20 h-[1px] bg-black"></div>
          <div className="py-1 px-3 border border-black rounded-full">3</div>
        </div>
        <div className="p-8 bg-gray-100 rounded-xl">
          <div className="flex gap-1 pb-6">
            <div>1. Сагс </div>
            <div>({userCart.length})</div>
          </div>
          <div className="flex flex-col gap-6">
            {userCart.map(({ product, quantity, selectedSize }) => (
              <div
                className="flex justify-between gap-6 bg-white rounded-xl p-4"
                key={product._id}
              >
                <div className="relative h-[120px] w-[120px]">
                  <Image
                    alt=""
                    fill
                    src={product.images[0]}
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="flex flex-col justify-between w-full ">
                  <div>
                    <div className="pb-1">{product.productName}</div>
                    <div className="flex items-center gap-4">
                      <div
                        className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black cursor-pointer hover:bg-[#E4E4E7]"
                        onClick={() =>
                          decreaseProductQuantity(
                            product,
                            selectedSize,
                            quantity
                          )
                        }
                      >
                        -
                      </div>
                      <div>{quantity}</div>

                      <div
                        className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black cursor-pointer hover:bg-[#E4E4E7]"
                        onClick={() =>
                          increaseProductQuantity(
                            product,
                            selectedSize,
                            quantity
                          )
                        }
                      >
                        +
                      </div>
                    </div>
                    <div>Size: {selectedSize}</div>
                  </div>
                  <div className="font-bold">
                    {(quantity * product.price).toLocaleString()}₮
                  </div>
                </div>
                <div className="p-4 cursor-pointer">
                  <FaRegTrashCan
                    onClick={() =>
                      removeProductFromCart(product, selectedSize, quantity)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex justify-between pt-6">
              <div>Үнийн дүн:</div>
              <div className="font-bold text-[20px]">
                {totalPrice.toLocaleString()}₮
              </div>
            </div>
            <Link href={`/buysteps/address`} className="self-end">
              <button className="px-9 py-2 rounded-full text-white bg-[#2563EB]">
                Худалдан авах
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
