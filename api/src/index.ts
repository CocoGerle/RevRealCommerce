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

connectToDataBase();

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

app.listen(3001, () => {
  console.log("server is running on http://localhost:3001");
});
