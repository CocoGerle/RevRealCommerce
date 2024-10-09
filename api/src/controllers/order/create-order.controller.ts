import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";
import { productModel } from "../../models/product.schema";

export const CreateOrder: RequestHandler = async (req, res) => {
  // console.log(req.body);
  console.log(req.body.product[0].productId);

  try {
    await orderModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // await productModel.findOneAndUpdate(
    //   { _id: req.body.product.productId },
    //   { $inc: { soldCount: 1 } },
    //   { new: true }
    // );
    await productModel.findByIdAndUpdate(
      req.body.product[0].productId,
      { $inc: { soldCount: req.body.product[0].qty } },
      { new: true }
    );

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
