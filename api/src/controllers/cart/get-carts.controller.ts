// import { cartModel } from "../../models/cart.schema";
// import { Request, Response } from "express";

// interface CustomRequest extends Request {
//   user?: { id: string };
// }

// export const getCartsController = async (req: CustomRequest, res: Response) => {
//   console.log(req.user);
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     console.log(req.user.id, "ydguydgvuydgfyvgfduygvudfgvudygudf");
//     const carts = await cartModel
//       .find({ userId: req.user.id })
//       .populate("cartProduct");

//     return res.status(201).json({
//       carts,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server errorrr",
//     });
//   }
// };

import { RequestHandler } from "express";
import { cartModel } from "../../models/cart.schema";

export const getCartsController: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId, "user Id shvv ----");
    const carts = await cartModel.find({ userId }).populate("cartProduct");
    return res.status(201).json({
      carts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errorrr",
    });
  }
};
