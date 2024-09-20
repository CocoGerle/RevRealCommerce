import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductsFilteredByCategoryController: RequestHandler = async (
  req,
  res
) => {
  // console.log(req.query.categoryId);
  try {
    if (!req.query.categoryId) {
      const allProducts = await productModel.find({}).populate("categoryId", {
        name: 1,
      });
      return res.status(200).json({
        allProducts,
      });
    }

    const filteredByCategoryProducts = await productModel
      .find({ categoryId: req.query.categoryId })
      .populate("categoryId");

    return res.status(200).json({
      allProducts: filteredByCategoryProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
    });
  }
};
