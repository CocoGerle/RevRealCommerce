import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const getCategoryByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoryModel.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
