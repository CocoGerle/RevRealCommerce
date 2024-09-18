import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const deleteOrderById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findByIdAndDelete(id);

    if (!order)
      return res.status(404).json({
        message: "Order not found",
      });

    return res
      .status(200)
      .json({ message: "Order deleted successfully", order });
  } catch (error) {
    res.status(500).json({
      error,
      message: "interval server error",
    });
  }
};
