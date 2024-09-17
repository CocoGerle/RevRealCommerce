import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password uu" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid email or passwordaaa" });
    // }
    // const jwtSecret = process.env.JWT_SECRET;
    // if (!jwtSecret) {
    //   return res.status(500).json({ message: "Server configuration error" });
    // }

    const token = jwt.sign(
      {
        userName: user.userName,
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRET as string
    );

    res.json({
      token,
      user: {
        userName: user.userName,
        email: user.email,
        id: user.id,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
