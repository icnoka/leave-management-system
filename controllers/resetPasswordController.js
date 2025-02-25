import { UserModel } from "../models/user_account.js";
import { mailTransport } from "../config/mail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

//Reseting a password
const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpString = otp.toString();
  const hashedOtp = crypto.createHash("sha256").update(otpString).digest("hex");
  const newOtp = otp.toString();
  return { otpString, hashedOtp };
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json("No user found with the given email");
    }

    const { otpString, hashedOtp } = generateOTP();
    user.resetToken = hashedOtp;
    user.resetTokenExpiresAt = Date.now() + 1800000; //Token expires in 30mins
    await user.save();

    // Send OTP via email
    await mailTransport.sendMail( {
      from: "Mojo Payments Ltd <noreply@mojopayments.com>", // Your email address
      to: user.email,
      subject: "Password Reset",
      text: `Please use the following OTP to complete the process of resetting your password:\n\n${otpString}\n\n. If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    res.status(200).json({
        message:
          "If your email is registered with us, you will receive a password recovery instruction.",
      });
  
    } catch (error) {
      next(error); 
    }
  };
export const verifyCode = async (req, res, next) => {
  try {
    const { email, newOtp } = req.body;

    // Validate email format
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpHash = newOtp.toString();

    const hashedOtp = crypto.createHash("sha256").update(otpHash).digest("hex");

    if (user.resetToken !== hashedOtp) {
      return res.status(400).json({ message: "Code is not valid" });
    }

    if (Date.now() > user.resetPasswordExpiresAt) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    return res.status(200).json({ message: "Code is valid" });
  } catch (error) {
    next(error);
  }
};

const validateNewPassword = (password) => {
  const hasNumber = /\d/;  // Regular expression to check if there's at least one digit in the password
  return password.length >= 8 && hasNumber.test(password);
};


export const changePassword = async (req, res, next) => {
  try {
      const { currentPassword, newPassword } = req.body;

      // Check if new password meets requirements
      if (!validateNewPassword(newPassword)) {
          return res.status(400).json({ error: "New password does not meet requirements" });
      }

      // Fetch user from the database
      const user = await UserModel.findById(req.user.id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Compare current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: "Current password is incorrect" });
      }

      // Check if the new password is different from the current password
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
          return res.status(400).json({ error: "New password cannot be the same as the current password" });
      }

      // Hash and update the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
      next(error);
  }
};




export const resetPassword = async (req, res, next) => {
  const { email, newOtp, password } = req.body;

  const otpHash = newOtp.toString();

  const hashedOtp = crypto.createHash("sha256").update(otpHash).digest("hex");

  try {
    const user = await UserModel.findOne({
      email,
      resetToken: hashedOtp,
      resetTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json(
          "Invalid or expired verification code. Please restart the password recovery process."
        );
    }

    // Validate the new password
    const { error } = passwordSchema.validate({ password });
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    // Ensure the new password is different from the previous password
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json("New password must be different from the old password.");
    }

    // Resetting the password
    const hashedPassword = bcrypt.hashSync(password, 12);
    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;

    await user.save();

    return res
      .status(200)
      .json(
        "Your password has been successfully reset. You can now log in with your new password."
      );
  } catch (error) {
    next(error);
  }
};