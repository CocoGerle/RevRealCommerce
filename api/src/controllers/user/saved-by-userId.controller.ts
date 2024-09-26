import { Request, Response } from "express";
import { userModel } from "../../models/user.schema";
interface CustomRequest extends Request {
  user?: { id: string };
}

export const SavedByUserId = async (req: CustomRequest, res: Response) => {
  console.log(req.user);
  const { userId, productId } = req.body;
  try {
    const user = await userModel.findById(userId);

    if (!user)
      return res.status(404).json({ message: "hereglegch baihgui baina" });

    const alreadyLiked = user.savedProduct?.includes(productId);

    if (alreadyLiked) {
      user.savedProduct = user.savedProduct?.filter(
        (id) => id.toString() !== productId
      );
    } else {
      user.savedProduct?.push(productId);
    }

    await user.save();

    return res.status(200).json({
      message: alreadyLiked
        ? "Product removed from liked"
        : "Product added to liked",
      savedProduct: user.savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
    });
  }
};
