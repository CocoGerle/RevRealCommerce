// // import { reviewModel } from "../../models/review.schema";
// // import { Request, Response } from "express";
// // import { userModel } from "../../models/user.schema";

// // interface CustomRequest extends Request {
// //   user?: { id: string };
// // }

// // export const deleteUserController = async (
// //   req: CustomRequest,
// //   res: Response
// // ) => {
// //   try {
// //     if (!req.user || !req.user.id) {
// //       return res.status(401).json({ message: "Unauthorized" });
// //     }

// //     const deletedReviewsByUserId = await reviewModel.deleteMany({
// //       userId: req.user.id,
// //     });

// //     const deletedUser = await userModel.findByIdAndDelete(req.user.id);

// //     if (!deletedUser) {
// //       return res.status(404).json({
// //         message: "User not found",
// //       });
// //     }

// //     return res.status(200).json({
// //       message: "User successfully deleted",
// //       deletedReviewsByUserId,
// //       deletedUser,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       message: "Interval server error",
// //       error,
// //     });
// //   }
// // };

// import { reviewModel } from "../../models/review.schema";
// import { productModel } from "../../models/product.schema";
// import { Request, Response } from "express";
// import { userModel } from "../../models/user.schema";

// interface CustomRequest extends Request {
//   user?: { id: string };
// }

// export const deleteUserController = async (
//   req: CustomRequest,
//   res: Response
// ) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const reviews = await reviewModel.find({
//       userId: req.user.id,
//     });

//     await reviewModel.deleteMany({
//       userId: req.user.id,
//     });

//     const productsIds = reviews.map((item) => item.productId);
//     console.log(productsIds, "product ids");

//     const productId = productsIds.map((product) => product);
//     console.log(productId, "product id");

//     const revu = await reviewModel.find({ productId });

//     await productModel.findByIdAndUpdate(
//       productId,
//       {
//         $inc: { reviewCount: -1 },
//         averageRating: 0,
//       },
//       { new: true }
//     );

//     const deletedUser = await userModel.findByIdAndDelete(req.user.id);

//     if (!deletedUser) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       message: "User and associated reviews successfully deleted",

//       deletedUser,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Internal server error",
//       error,
//     });
//   }
// };

import { reviewModel } from "../../models/review.schema";
import { productModel } from "../../models/product.schema";
import { Request, Response } from "express";
import { userModel } from "../../models/user.schema";

interface CustomRequest extends Request {
  user?: { id: string };
}
interface Review {
  productId: string;
  rating: number;
  // Add other fields if necessary
}

export const deleteUserController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find all reviews by the user
    const reviews = await reviewModel.find({
      userId: req.user.id,
    });

    // Get unique productIds associated with the user's reviews
    const productIds = [...new Set(reviews.map((item) => item.productId))];

    // Delete all reviews by the user
    await reviewModel.deleteMany({
      userId: req.user.id,
    });

    // For each product, update the review count and recalculate the average rating

    await Promise.all(
      productIds.map(async (productId) => {
        const remainingReviews: Review[] = await reviewModel.find({
          productId,
        });

        const newReviewCount = remainingReviews.length;

        // Calculate the new average rating safely
        const newAverageRating =
          newReviewCount > 0
            ? remainingReviews.reduce((acc, review) => acc + review.rating, 0) /
              newReviewCount
            : 0;

        await productModel.findByIdAndUpdate(
          productId,
          {
            reviewCount: newReviewCount,
            averageRating: newAverageRating,
          },
          { new: true }
        );
      })
    );

    // Delete the user
    const deletedUser = await userModel.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User and associated reviews successfully deleted",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
