import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await orderModel.find();

    if (!orders) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Interval server error",
      error,
    });
  }
};
