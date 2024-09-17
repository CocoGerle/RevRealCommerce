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
  if (req.path.startsWith("/auth")) return next();

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

// import { NextFunction, Response, Request } from 'express';
// import jwt from 'jsonwebtoken';

// interface CustomRequest extends Request {
//   user?: {
//     userName: string;
//     email: string;
//     id: string;
//   };
// }

// const authMiddleware = (
//   req: CustomRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   // Skip authentication for routes that start with "/auth"
//   if (req.path.startsWith('/auth')) return next();

//   const authHeader = req.headers.authorization;
//   const token = authHeader?.split(' ')[1];

//   // Check if token is provided
//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized: Token missing' });
//   }

//   try {
//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       return res.status(500).json({ error: 'Server configuration error' });
//     }

//     // Verify the JWT token
//     const decodedToken = jwt.verify(token, jwtSecret) as {
//       userName: string;
//       email: string;
//       id: string;
//     };

//     // Attach user to request object
//     req.user = {
//       userName: decodedToken.userName,
//       email: decodedToken.email,
//       id: decodedToken.id,
//     };

//     next();
//   } catch (err) {
//     console.error('Authentication error:', err);
//     return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//   }
// };

// export default authMiddleware;
