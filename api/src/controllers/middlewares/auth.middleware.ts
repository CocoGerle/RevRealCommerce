import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: object;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.path.startsWith("/auth") ||
    req.path.startsWith("/product") ||
    req.path.startsWith("/category")
  )
    return next();

  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET) as {
      user: object;
    };

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;
