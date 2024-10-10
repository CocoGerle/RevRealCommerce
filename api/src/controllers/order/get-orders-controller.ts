import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const getOrdersController: RequestHandler = async (req, res) => {
  try {
    const { userId, admin, status } = req.query;

    let query = {};

    if (admin) {
      if (status) {
        query = { status };
      }
    } else if (userId) {
      query = { userId };
    }

    const orders = await orderModel.find(query).populate("product.productId");
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Failed to fetch orders." });
  }
};
