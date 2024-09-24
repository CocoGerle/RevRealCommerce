import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const register: RequestHandler = async (req, res) => {
  const { userName, email, password, id } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = await userModel.create({
      id,
      userName,
      email,
      password,
    });

    return res.status(201).json({
      message: "Registered successfully",
      user: {
        id: newUser.id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
