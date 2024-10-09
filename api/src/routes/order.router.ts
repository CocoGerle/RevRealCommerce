import { Router } from "express";
import { CreateOrder } from "../controllers/order/create-order.controller";
import { getOrdersByUserId } from "../controllers/order/get-orders-by-userId.controller";
import { deleteOrderById } from "../controllers/order/delete-order-by-id";
import { getOrders } from "../controllers/order/get-orders-controller";
import { updateOrderController } from "../controllers/order/update-order.controller";

const orderRouter = Router();

orderRouter
  .post("/", CreateOrder)
  .get("/:id", getOrdersByUserId)
  .get("/", getOrders)
  .delete("/:id", deleteOrderById)
  .put("/update", updateOrderController);

export { orderRouter };
