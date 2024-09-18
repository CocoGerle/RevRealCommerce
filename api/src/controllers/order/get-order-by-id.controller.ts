import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const getOrderById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Interval server error",
      error,
    });
  }
};
