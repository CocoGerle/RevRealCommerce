import { Router } from "express";
import { createProductController } from "../controllers/product/create-product.controller";
import { getProductsController } from "../controllers/product/get-products.controller";
import { getProductByIdController } from "../controllers/product/get-product-by-id.controller";
import { getProductsFilteredByCategoryController } from "../controllers/product/get-products-filtered-by-category.controller";

const productRouter = Router();

productRouter
  .post("/", createProductController)
  .get("/", getProductsController)
  .get("/:id", getProductByIdController)
  .get("/categoryId/:id", getProductsFilteredByCategoryController);

export { productRouter };
