import { Request, Response } from "express";
import { userModel } from "../../models/user.schema";

interface CustomRequest extends Request {
  user?: { id: string }; // Adjust this to match your user structure
}

export const getMe = async (req: CustomRequest, res: Response) => {
  console.log(req.user);
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userModel.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const userData = {
      id: user._id,
      name: user.userName,
      email: user.email,
      // Avahiig hussen datagaa bicij bolno
    };

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
