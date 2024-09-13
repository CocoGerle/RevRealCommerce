import { connect } from "mongoose";

export const connectToDataBase = async () => {
  await connect(
    "mongodb+srv://cocogerle:SOd7Xa9lx23Jy7Ty@cluster0.pjy4k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected to database");
};
