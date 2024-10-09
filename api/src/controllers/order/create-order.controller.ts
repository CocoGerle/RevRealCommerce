import { RequestHandler } from "express";
import { orderModel } from "../../models/order.schema";
import { productModel } from "../../models/product.schema";

export const CreateOrder: RequestHandler = async (req, res) => {
  // console.log(req.body);
  // console.log(req.body.product[0].productId);

  try {
    await orderModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // await productModel.findByIdAndUpdate(
    //   req.body.product[0].productId,
    //   { $inc: { soldCount: req.body.product[0].qty } },
    //   { new: true }
    // );

    const products = req.body.product;

    if (Array.isArray(products)) {
      // If multiple products, iterate and update the soldCount for each
      for (const product of products) {
        await productModel.findByIdAndUpdate(
          product.productId,
          { $inc: { soldCount: product.qty } }, // Increment soldCount by the quantity ordered
          { new: true }
        );
      }
    }

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
