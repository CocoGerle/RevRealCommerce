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
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
