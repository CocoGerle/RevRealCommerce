import mongoose, { model, Schema } from "mongoose";
import { productModel } from "./product.schema";

const orderSchema = new Schema({
  product: {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },

  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Ordered",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const orderModel = model("Order", orderSchema);
