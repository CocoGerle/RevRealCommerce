import express from "express";
import { connectToDataBase } from "./database";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import {
  authRouter,
  categoryRouter,
  orderRouter,
  productRouter,
  reviewRouter,
  userRouter,
} from "./routes";
import authMiddleware from "./controllers/middlewares/auth.middleware";
import { cartRouter } from "./routes/cart.router";
import { upload } from "./config/multer";
import { v2 as cloudinary } from "cloudinary";
import { createCloudinaryController } from "./controllers/cloudinary/create-cloudinary.controller";

connectToDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "hello" });
});

app.use(authMiddleware);

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/review", reviewRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);

console.log(process.env.API_KEY);

app.post("/upload", upload.single("image"), createCloudinaryController);

app.listen(3001, () => {
  console.log("server is running on http://localhost:3001");
});
