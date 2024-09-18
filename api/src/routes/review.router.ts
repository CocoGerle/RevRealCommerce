import { Router } from "express";
import { createReviewController } from "../controllers/review/create-review.controller";
import { getReviewByProductIdController } from "../controllers/review/get-review-by-productId.controller";

const reviewRouter = Router();

reviewRouter
  .post("/", createReviewController)
  .get("/:id", getReviewByProductIdController);

export { reviewRouter };
