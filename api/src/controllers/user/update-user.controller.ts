import { Request, Response } from "express";
import { userModel } from "../../models/user.schema";

interface CustomRequest extends Request {
  user?: { id: string };
}

export const UpdateUserController = async (
  req: CustomRequest,
  res: Response
) => {
  console.log(req.user);
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userModel.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user.id },
      req.body,
      {
        new: true,
      }
    );
    return res.status(201).json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ.",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Хэрэглэгчийн мэдээлэл шинэчлэхэд алдаа гарлаа." });
  }
};
