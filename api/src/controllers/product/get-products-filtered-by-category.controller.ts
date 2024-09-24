// import { RequestHandler } from "express";
// import { productModel } from "../../models/product.schema";

// export const getProductsFilteredByCategoryController: RequestHandler = async (
//   req,
//   res
// ) => {
//   try {
//     const { categoryId, size } = req.query;

//     // Return all products if both categoryId and size are "All"
//     if (categoryId === "All" && size === "All") {
//       const allProducts = await productModel.find({}).populate("categoryId", {
//         name: 1,
//       });
//       return res.status(200).json({
//         allProducts,
//       });
//     }

//     // Create the filter object for the query
//     const filter: any = {};

//     // Apply categoryId filter if provided
//     if (categoryId && categoryId !== "All") {
//       filter.categoryId = categoryId;
//     }

//     // Apply size filter if provided
//     if (size && size !== "All") {
//       filter.size = size;
//     }

//     // Query the database with the constructed filter
//     const filteredByCategoryProducts = await productModel
//       .find(filter)
//       .populate("categoryId");

//     return res.status(200).json({
//       allProducts: filteredByCategoryProducts,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

import { RequestHandler } from "express";
import { productModel } from "../../models/product.schema";

export const getProductsFilteredByCategoryController: RequestHandler = async (
  req,
  res
) => {
  try {
    const { categoryId, size } = req.query;

    const filter: any = {};

    // Check if categoryId is provided and handle multiple categories
    if (categoryId && categoryId !== "All") {
      const categoryIdsArray = (categoryId as string).split(","); // Convert the comma-separated string into an array
      filter.categoryId = { $in: categoryIdsArray }; // Use $in to match any of the selected categories
    }

    // Check if size filter is provided
    if (size && size !== "All") {
      filter.size = size;
    }

    const filteredProducts = await productModel
      .find(filter)
      .populate("categoryId");

    return res.status(200).json({
      allProducts: filteredProducts,
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
