import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const UpdateProductByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
      error,
    });
  }
};
