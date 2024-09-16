import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import jwt from "jsonwebtoken";

export const Login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email, password });

    if (!user)
      return res.status(401).json({ message: "iim hereglegch baihgui baina." });

    const token = jwt.sign(
      {
        userName: user.userName,
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRET!
    );
    res.json({
      token,
      user: {
        userName: user.userName,
        email: user.email,
        id: user.id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Interval server error",
    });
  }
};
export default Login;
