import { Router } from "express";
import { CreateOrder } from "../controllers/order/create-order.controller";
import { getOrders } from "../controllers/order/get-orders.controller";
import { getOrderById } from "../controllers/order/get-order-by-id.controller";
import { deleteOrderById } from "../controllers/order/delete-order-by-id";

const orderRouter = Router();

orderRouter
  .post("/", CreateOrder)
  .get("/", getOrders)
  .get("/:id", getOrderById)
  .delete("/:id", deleteOrderById);

export { orderRouter };
