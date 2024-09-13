import express from "express";
import { connectToDataBase } from "./database";
import cors from "cors";
import { categoryRouter, productRouter } from "./routes";

connectToDataBase();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "hello" });
});

app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.listen(3001, () => {
  console.log("server is running on http://localhost:3001");
});
