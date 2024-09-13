import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const createProductController: RequestHandler = async (req, res) => {
  try {
    await productModel.create({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval setver eroor",
    });
  }
};
