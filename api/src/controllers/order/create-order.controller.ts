import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const CreateOrder: RequestHandler = async (req, res) => {
  try {
    await orderModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return res.status(201).json({
      message: "Order created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Intervel server error",
      error,
    });
  }
};
