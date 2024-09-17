import { Router } from "express";

import { register } from "../controllers/user/register.controller";
import { Login } from "../controllers/user/login.controller";

const authRouter = Router();

authRouter.post("/register", register).post("/login", Login);

export { authRouter };
