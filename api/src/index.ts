import express from "express";
import { connectToDataBase } from "./database";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import {
  authRouter,
  categoryRouter,
  productRouter,
  userRouter,
} from "./routes";
import authMiddleware from "./controllers/middlewares/auth.middleware";

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

app.listen(3001, () => {
  console.log("server is running on http://localhost:3001");
});
