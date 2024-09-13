import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: [Schema.Types.ObjectId],
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  size: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 0,
  },
  thumbnails: {
    type: [String],
    required: false,
  },
  images: {
    type: [String],
    required: false,
  },
  coupon: {
    type: String,
    required: false,
  },
  salePercent: {
    type: Number,
    required: false,
    min: 0,
    max: 100,
  },
  description: {
    type: String,
    required: false,
    maxlength: 500,
  },
  viewsCount: {
    type: Number,
    default: 0,
    min: 0,
    require: false,
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

export const productModel = model("Product", productSchema);
