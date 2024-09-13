import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductsController: RequestHandler = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("categoryId", {
      name: 1,
    });

    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
    });
  }
};
