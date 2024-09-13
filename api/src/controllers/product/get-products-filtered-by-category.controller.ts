import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductsFilteredByCategoryController: RequestHandler = async (
  req,
  res
) => {
  try {
    console.log(req.params, "params");
    const products = await productModel
      .find({ categoryId: req.params.id })
      .populate("categoryId");

    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
    });
  }
};
