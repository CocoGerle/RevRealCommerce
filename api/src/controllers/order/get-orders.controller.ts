import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
      error,
    });
  }
};
