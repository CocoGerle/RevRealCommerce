import { RequestHandler } from "express";
import { userModel } from "../../models/user.schema";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import main from "../../utils/email";
import nodemailer from "nodemailer"; // Assuming you are using nodemailer for sending emails

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "password sergeh emailee oruul" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: `Iim email ystoi alga: ${email}`,
      });
    }

    const generateResetToken = jwt.sign(
      {
        userName: user.userName,
        email: user.email,
        id: user.id,
      },
      process.env.RESET_PASSWORD_KEY as string,
      { expiresIn: "20m" }
    );
    // ene bol nuuts ug sergeedeg token
    const resetToken = crypto.randomBytes(20).toString("hex");
    console.log(resetToken);

    // userModel deh resetPasswordruuu hiij ugluu.
    user.resetPassword = generateResetToken;

    await user.save();

    res.status(200).json({
      message: "Амжилттай: Password reset link sent.",
      resetToken,
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({
      message: `Internal Server Error:`,
      error,
    });
  }
};

// Send email with the reset token
//   const resetLink = `https://localhost:3001/forgotPassword?token=${generateResetToken}`;

//   const transporter = nodemailer.createTransport({
//     service: "gmail", // Or any other email service
//     auth: {
//       user: process.env.EMAIL_USER, // Your email account
//       pass: process.env.EMAIL_PASS, // Your email password
//     },
//   });

//   const mailOptions = {
//     from: "no-reply@yourapp.com",
//     to: email,
//     subject: "Password Reset Request",
//     html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({
//       message: "Password reset link has been sent to your email.",
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ message: "Error sending the reset link email." });
//   }
