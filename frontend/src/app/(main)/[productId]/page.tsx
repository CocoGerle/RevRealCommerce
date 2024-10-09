"use client";
import { Cards } from "@/components/Cards";
import { api } from "@/components/lib/axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { UserContext } from "@/components/utils/context";
import { useCart } from "@/components/utils/CartProvider";
import Link from "next/link";

const totalStars = 5;

type IdType = {
  productId: string;
};

type ProductType = {
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
type ReviewType = {
  _id: string;
  productId: string;
  comment: string;
  userId: string;
  rating: number;
};

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

const Detail = () => {
  const {
    addProductToCart,
    setCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  const userContext = useContext(UserContext);

  if (!userContext) {
    return <div>Loading...</div>;
  }

  const { user, getUser } = userContext;

  const getProducts = async () => {
    try {
      const response = await api?.get("/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(response.data.allProducts);
    } catch (error) {
      return console.log(error);
    }
  };

  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  // const buyProduct = async () => {
  //   try {
  //     const response = await api.post(
  //       `http://localhost:3001/cart`,
  //       {
  //         userId: user?.id,
  //         quantity: count,
  //         cartProduct: productId,
  //         size: sizeChange,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getProducts();
  }, []);
  const [product, setProduct] = useState<ProductType>();
  console.log(product);

  const [review, setReview] = useState<ReviewType[]>([]);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const [hiddenElement, setHiddenElement] = useState(false);
  const [count, setCount] = useState(0);
  // setCart(count);
  console.log(count);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [hiddenComment, setHiddenComment] = useState(false);

  const [bgColor, setBgColor] = useState(6);

  const { productId } = useParams<IdType>();

  const [hearts, setHearts] = useState<{ [index: number]: boolean }>({});

  const getProduct = async (productId: string) => {
    try {
      const response = await api?.get(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProduct(response.data.product);
    } catch (error) {
      return console.log(error);
    }
  };

  const getReview = async (productId: string) => {
    try {
      const response = await api?.get(`/review/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReview(response.data.review);
      console.log(response.data.review);
    } catch (error) {}
  };

  const createReview = async (
    productId: string,
    userId: string,
    comment: string,
    rating: number,
    userName: string
  ) => {
    try {
      const response = await api?.post(
        "http://localhost:3001/review/",
        {
          productId,
          userId,
          comment,
          rating,
          userName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComment("");
      setRating(0);
      await getReview(productId);
      getProduct(productId);
      console.log(response.data);
    } catch (error) {
      console.log("Review error");
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(productId);
    getReview(productId);
  }, []);

  return (
    <div className="max-w-screen-2xl m-auto mt-[52px]">
      <div className="flex items-start justify-center gap-[20px] w-full  ">
        <div className="pt-[100px] flex flex-col gap-2 ">
          {product?.images.map((item, index) => (
            <div key={index}>
              <Image
                className={`rounded-md cursor-pointer ${
                  currentImage === index ? "border border-black" : ""
                }`}
                src={item}
                alt=""
                width={67}
                height={67}
                onClick={() => setCurrentImage(index)}
              />
            </div>
          ))}
        </div>
        <div className="w-[422px] h-[521px] relative">
          {product?.images ? (
            <Image
              className="rounded-2xl"
              style={{ objectFit: "cover" }}
              src={product?.images[currentImage]}
              fill
              alt=""
            />
          ) : (
            <p>no image selected</p>
          )}
        </div>

        <div className=" w-[50%]">
          <div className="pt-[100px] flex flex-col gap-6">
            <div>
              <div className="flex flex-col gap-2">
                <div className="py-[2px] px-[10px] rounded-full border w-fit font-semibold border-[#2563EB]">
                  ШИНЭ
                </div>
                <div className="flex gap-2">
                  <div>{product?.productName}</div>
                  {/* <div onClick={() => toggleHeart(product?._id)}>
                    {product?._id && hearts[product._id] ? (
                      <GoHeartFill size={24} />
                    ) : (
                      <GoHeart size={24} />
                    )}
                  </div> */}
                </div>
                <div>{product?.description}</div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="underline">Хэмжээний заавар</div>
                <div className="flex gap-1">
                  {product?.size.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setBgColor(index);
                          setSelectedSize(item);
                        }}
                        className={`flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black cursor-pointer ${
                          bgColor === index
                            ? "bg-black text-white "
                            : "bg-white"
                        }`}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black cursor-pointer"
                  onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}
                  // onClick={() => decreaseProductQuantity(product)}
                ></div>
                <div>{count}</div>
                <div
                  className="flex justify-center items-center p-2 w-8 h-8 rounded-full border border-black cursor-pointer"
                  onClick={() => setCount((prev) => prev + 1)}
                  // onClick={() => increaseProductQuantity(product)}
                >
                  +
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-[20px] pb-2">
                {product?.price.toLocaleString()}₮
              </div>

              <button
                className="text-white bg-[#2563EB] py-2 px-9 rounded-full"
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select a size before adding to the cart.");
                    return;
                  }
                  addProductToCart(product, selectedSize);
                }}
              >
                Сагсанд нэмэх
              </button>
            </div>
            <div>
              <div className="flex gap-4">
                <div>Үнэлгээ</div>
                <div
                  onClick={() => {
                    setHiddenElement(!hiddenElement);
                  }}
                  className="cursor-pointer underline text-[#2563EB]"
                >
                  {hiddenElement ? "Бүгдийг хураах" : "Бүгдийг харах"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: totalStars }, (_, starIndex) => {
                    const averageRating = product?.averageRating || 0;
                    const wholeRating = Math.floor(averageRating);
                    return (
                      <FaStar
                        key={starIndex}
                        className={`${
                          starIndex < wholeRating
                            ? "text-yellow-300"
                            : starIndex < averageRating
                            ? "text-yellow-200"
                            : "text-gray-300"
                        } text-xl`}
                      />
                    );
                  })}
                </div>
                <div className="font-bold">
                  {product?.averageRating?.toFixed(1)}
                </div>
                <div className="text-[#71717A]">({product?.reviewCount})</div>
              </div>
            </div>
            <div className={`${hiddenElement ? "block" : "hidden"}`}>
              <div>
                {review?.map((item: ReviewType, index: number) => (
                  <div
                    key={index}
                    className="border-gray-200 border-b border-dashed pt-6 pb-[21px]"
                  >
                    <div className="flex items-center gap-2">
                      <div>{item.userId?.userName}</div>
                      <div className="flex">
                        {Array.from({ length: totalStars }, (_, starIndex) => (
                          <FaStar
                            key={starIndex}
                            className={`${
                              starIndex < Math.floor(item.rating)
                                ? "text-yellow-300"
                                : starIndex < item.rating
                                ? "text-yellow-200"
                                : "text-gray-300"
                            } text-xl`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-[#71717A]">{item.comment}</div>
                  </div>
                ))}
              </div>
              <div
                className={`${
                  hiddenComment === false ? "flex" : "hidden"
                } flex flex-col gap-6 bg-gray-100 rounded-lg p-6`}
              >
                <div>
                  <div>Одоор үнэлэх:</div>
                  <div className="flex">
                    {Array.from({ length: totalStars }, (_, index) => (
                      <FaStar
                        key={index}
                        onClick={() => setRating(index + 1)}
                        className={`cursor-pointer ${
                          index < rating ? "text-yellow-300" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-6 flex-col">
                  <div>Сэтгэгдэл үлдээх:</div>
                  <div className="w-full">
                    <input
                      className="border w-full h-[94px] rounded-lg"
                      placeholder="Энд бичнэ үү"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setComment(event.target.value)
                      }
                    />
                  </div>
                  <button
                    className="bg-[#2563EB] w-fit text-white py-2 px-9 rounded-full"
                    onClick={() => {
                      createReview(productId, user?.id, comment, rating);
                      setHiddenComment(!hiddenComment);
                    }}
                  >
                    Үнэлэх
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[80px] mb-[87px] max-w-screen-xl m-auto">
        <h1 className="text-[30px] font-bold mb-[24px]">Холбоотой бараа</h1>
        <div className="grid grid-cols-4 gap-x-5 gap-y-12">
          {products.slice(0, 8).map((item, index) => {
            const customHeight = "331px";
            return (
              <div key={index}>
                <Cards
                  images={item.images}
                  productName={item.productName}
                  price={item.price}
                  customHeight={customHeight}
                  index={index}
                  id={item._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Detail;
