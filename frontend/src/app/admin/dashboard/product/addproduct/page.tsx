"use client";
import { api } from "@/components/lib/axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sizeData = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];
interface Category {
  name: string;
  _id: string;
}
export default function Home() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [allCategories, setAllCategories] = useState<Category[] | null>(null);
  const [categoryId, setCategoryId] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [qty, setQty] = useState<number | undefined>();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) setImage(files[0]);
  };
  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();

    formData.append("image", image);

    const res = await api.post("/upload", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const uploadImages = [...imgUrl, res.data.secure_url];
    setImgUrl(uploadImages);
    setLoading(false);
  };
  const createProduct = async () => {
    try {
      const response = await api.post(
        "/product",
        {
          productName,
          price,
          categoryId,
          description,
          size,
          images: imgUrl,
          qty,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Бүтээгдэхүүн амжилттай нэмлээ!");
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Бүтээгдэхүүн нэмэхэд алдаа гарлаа.");
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get("/category/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllCategories(response.data.categories);
      console.log(response.data.categories);
    } catch (error) {
      console.log("error bdgshaa");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  console.log(allCategories);
  console.log(categoryId);
  console.log(size);

  const handleCategory = (id: string) => {
    if (categoryId?.includes(id)) {
      setCategoryId(categoryId.filter((filterId) => filterId !== id));
    } else {
      setCategoryId([...categoryId, id]);
    }
  };

  const handleSize = (item: string) => {
    if (size.includes(item)) {
      setSize(size.filter((sizeName) => sizeName !== item));
    } else {
      setSize([...size, item]);
    }
  };

  console.log(imgUrl);

  return (
    <div className="bg-[#1C20240A] p-4">
      <div className="flex w-[940px] m-auto gap-4">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex gap-4 items-center p-4 bg-white">
            <div className="">
              <FaArrowLeft />
            </div>
            <div>Бүтээгдэхүүн нэмэх</div>
          </div>
          <div className="flex gap-6">
            <div className="flex-1 flex flex-col gap-4">
              <div className="p-6 flex flex-col bg-white rounded-lg  gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-semibold text-[#121316]">
                    Бүтээгдэхүүний нэр
                  </div>
                  <input
                    placeholder="Нэр"
                    onChange={(event) => setProductName(event.target.value)}
                    value={productName}
                    className="bg-[#F7F7F8] text-[#8B8E95] p-2 rounded-lg w-full"
                  ></input>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-semibold text-[#121316]">
                    Нэмэлт мэдээлэл
                  </div>
                  <textarea
                    placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
                    className="bg-[#F7F7F8] text-[#8B8E95] p-2 rounded-lg w-full  resize-none"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-col p-6 gap-4 bg-white rounded-lg">
                <div className="font-semibold text-lg">
                  Бүтээгдэхүүний зураг
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    {imgUrl.map((item, index) => {
                      return (
                        <div key={index} className="flex-1">
                          <div className="relative w-[125px] h-[200px]">
                            <Image
                              src={item}
                              fill
                              alt="Product Image"
                              className="object-fill"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex-1 flex justify-center items-center gap-2">
                    <input
                      type="file"
                      className="text-sm"
                      onChange={handleChangeFile}
                    />
                    <button onClick={handleUpload}>
                      {loading ? "Uploading ..." : "Upload"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex  p-6 gap-4 bg-white rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-semibold">Үндсэн үнэ</div>
                  <input
                    className="p-3 bg-[#F7F7F8] text-[#8B8E95] rounded-lg w-full"
                    placeholder="Үндсэн үнэ"
                    value={price}
                    type="number"
                    onChange={(event) =>
                      setPrice(Number(event.target.value) || undefined)
                    }
                  ></input>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">
                    Үлдэгдэл тоо ширхэг
                  </div>
                  <input
                    className="p-3 bg-[#F7F7F8] text-[#8B8E95] rounded-lg w-full"
                    placeholder="Үлдэгдэл тоо ширхэг"
                    type="number"
                    value={qty}
                    onChange={(event) =>
                      setQty(Number(event.target.value) || undefined)
                    }
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white rounded-lg w-full flex flex-col gap-4 p-6">
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">Ерөнхий ангилал</div>
                  <div className="flex flex-col gap-1">
                    {allCategories?.map((item, index) => {
                      return (
                        <label key={index}>
                          <input
                            type="checkbox"
                            id={item.name}
                            checked={categoryId?.includes(item._id)}
                            onChange={() => handleCategory(item._id)}
                          />
                          {item.name}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg w-full flex flex-col gap-6 p-6">
                <div className="font-semibold">Хэмжээ</div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-6">
                    <div className="flex gap-3 justify-center">
                      {sizeData.map((item, index) => {
                        return (
                          <label key={index}>
                            <input
                              type="checkbox"
                              id={item}
                              checked={size.includes(item)}
                              onClick={() => handleSize(item)}
                            />
                            {item}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="flex gap-6">
                  <div
                    className="bg-black text-white font-semibold rounded-lg w-fit px-5 py-4 text-lg cursor-pointer"
                    onClick={createProduct}
                  >
                    Нийтлэх
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
