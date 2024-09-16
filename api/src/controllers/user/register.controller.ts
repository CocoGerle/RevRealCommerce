import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";

export const Register: RequestHandler = async (req, res) => {
  const { userName, email, password, id } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user)
      return res.status(401).json({ message: "ene email bvrtgeltei baina" });

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
    return res.status(500).json({
      message: "Interval setver eroor",
    });
  }
};
