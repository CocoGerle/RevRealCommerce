import { Router } from "express";
import { createCategoryController } from "../controllers/category/create-category.controller";
import { getCategoriesController } from "../controllers/category/get-categories.controller";
import { getCategoryByIdController } from "../controllers/category/get-category-by-id.controller";

const categoryRouter = Router();

categoryRouter
  .post("/", createCategoryController)
  .get("/", getCategoriesController)
  .get("/:id", getCategoryByIdController);

export { categoryRouter };
