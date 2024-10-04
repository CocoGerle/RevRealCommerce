import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";

export const CreateOrder: RequestHandler = async (req, res) => {
  console.log(req.body);

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
      message: "Захиалга үүсгэхэд алдаа гарлаа. Мэдээллээ бүрэн оруулна уу!",
      error,
    });
  }
};
