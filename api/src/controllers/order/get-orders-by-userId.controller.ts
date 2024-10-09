import { Request, Response } from "express";
import { orderModel } from "../../models/order.schema";

interface CustomRequest extends Request {
  user?: { id: string };
}

export const getOrdersByUserId = async (req: CustomRequest, res: Response) => {
  // console.log(req.user, "aaaaaaaa");
  try {
    const orders = await orderModel
      .find({ userId: req.user?.id })
      .populate("product.productId");

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
