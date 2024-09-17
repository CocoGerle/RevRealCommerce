import { Request, Response } from "express";
import { userModel } from "../../models/user.schema";

interface MyRequest extends Request {
  userId?: string;
}

export const getMe = async (req: MyRequest, res: Response) => {
  try {
    const user = userModel.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
