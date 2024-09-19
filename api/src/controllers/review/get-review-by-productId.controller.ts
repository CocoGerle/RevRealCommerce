import { RequestHandler } from "express";
import { reviewModel } from "../../models/review.schema";
import { productModel } from "../../models/product.schema";

export const getReviewByProductIdController: RequestHandler = async (
  req,
  res
) => {
  const { id } = req.params;
  try {
    const review = await reviewModel
      .find({ productId: id })
      .populate("userId", { userName: 1 });

    return res.status(200).json({
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
      error,
    });
  }
};
