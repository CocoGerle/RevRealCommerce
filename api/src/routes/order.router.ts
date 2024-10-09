import { Router } from "express";
import { CreateOrder } from "../controllers/order/create-order.controller";
import { deleteOrderById } from "../controllers/order/delete-order-by-id";
import { updateOrderController } from "../controllers/order/update-order.controller";
import { getOrderByIdController } from "../controllers/order/get-order.controller";
import { getOrdersController } from "../controllers/order/get-orders-controller";

const orderRouter = Router();

orderRouter
  .post("/", CreateOrder)
  // .get("/:id", getOrdersByUserId)
  .get("/", getOrdersController)
  .delete("/:id", deleteOrderById)
  .put("/update", updateOrderController)
  .get("/:orderID", getOrderByIdController);

export { orderRouter };
