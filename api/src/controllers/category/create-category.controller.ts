import { RequestHandler } from "express";
import { categoryModel } from "../../models/category.schema";

export const createCategoryController: RequestHandler = async (req, res) => {
  try {
    await categoryModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
    });
  }
};
