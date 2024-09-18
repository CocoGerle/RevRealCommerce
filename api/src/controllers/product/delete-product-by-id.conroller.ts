import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const deleteProductByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Delete successfully",
      deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
      error,
    });
  }
};
