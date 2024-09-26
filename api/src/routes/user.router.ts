import { Router } from "express";
import { getMe } from "../controllers/user/getMe.controller";
import { SavedByUserId } from "../controllers/user/saved-by-userId.controller";

const userRouter = Router();

userRouter.get("/me", getMe).post("/", SavedByUserId);

export { userRouter };
