import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
    });
  }
};
