import { Router } from "express";
import { createProductController } from "../controllers/product/create-product.controller";
import { getProductsController } from "../controllers/product/get-products.controller";
import { getProductByIdController } from "../controllers/product/get-product-by-id.controller";
import { getProductsFilteredByCategoryController } from "../controllers/product/get-products-filtered-by-category.controller";
import { deleteProductByIdController } from "../controllers/product/delete-product-by-id.conroller";
import { UpdateProductByIdController } from "../controllers/product/update-product-by-id.controller";

const productRouter = Router();

productRouter
  .post("/", createProductController)
  .get("/", getProductsController)
  .get("/:id", getProductByIdController)
  .get("/categoryId/:id", getProductsFilteredByCategoryController)
  .delete("/:id", deleteProductByIdController)
  .put("/:id", UpdateProductByIdController);

export { productRouter };
