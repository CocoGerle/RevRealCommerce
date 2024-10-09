import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const updateOrderController: RequestHandler = async (req, res) => {
  const { orderId, newStatus } = req.query;

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "order not found",
      });
    }

    return res.status(200).json({
      message: "Updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal serverrr error",
    });
  }
};
