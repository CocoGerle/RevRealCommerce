import { Router } from "express";

import { register } from "../controllers/user/register.controller";
import { Login } from "../controllers/user/login.controller";
import { forgotPassword } from "../controllers/user/forgotPassword";

const authRouter = Router();

authRouter
  .post("/register", register)
  .post("/login", Login)
  .post("/forgotPassword", forgotPassword);

export { authRouter };
