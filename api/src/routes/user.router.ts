import { Router } from "express";
import { getMe } from "../controllers/user/getMe.controller";
import { SavedByUserId } from "../controllers/user/saved-by-userId.controller";
import { UpdateUserController } from "../controllers/user/update-user.controller";
import { deleteUserController } from "../controllers/user/deleteUser.controller";

const userRouter = Router();

userRouter
  .get("/me", getMe)
  .post("/", SavedByUserId)
  .put("/update", UpdateUserController)
  .delete("/:id", deleteUserController);

export { userRouter };
