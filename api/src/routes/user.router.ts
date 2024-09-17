import { Router } from "express";
import { getMe } from "../controllers/user/getMe.controller";

const userRouter = Router();

userRouter.get("/me", getMe);

export { userRouter };
