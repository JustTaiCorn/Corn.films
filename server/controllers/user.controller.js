import bcryptjs from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../configs/cloudinary.config.js";
import {
  ACCESS_TOKEN_TTL,
  generateTokenAndSetCookie,
  REFRESH_TOKEN_TTL,
} from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";
import { Session } from "../models/Session.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      username,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,

      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.username);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      await Session.deleteOne({ refreshToken: token });
    }
    res.clearCookie("refreshToken");
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("error in logout ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email không tồn tại" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không đúng" });
    }

    // Kiểm tra xem người dùng đã xác thực email hay chưa
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng xác thực email trước khi đăng nhập",
      });
    }

    const { accessToken, refreshToken } = generateTokenAndSetCookie(
      res,
      user._id
    );
    const session = new Session({
      userId: user._id,
      refreshToken,
      expiresAt: Date.now() + REFRESH_TOKEN_TTL,
    });
    await session.save();
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
      accessToken,
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // Thay đổi từ req.userId thành req.user.id
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updatepassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu cũ không đúng" });
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log("Error in updatepassword ", error);
    res
      .status(500)
      .json({ success: false, message: "False to update password" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.username = username;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in updateProfile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const cldRes = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "Pop-corn-films",
        resource_type: "image",
        format: "webp",
      },
      (error, result) => {
        console.log(result, error);
      }
    );

    user.avatarUrl = cldRes.secure_url;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      avatarUrl: user.avatarUrl,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in updateAvatar:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update avatar",
    });
  }
};
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }
    const session = await Session.findOne({ refreshToken: token });
    if (!session) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired refresh token" });
    }

    if (session.expiresAt < Date.now()) {
      return res
        .status(401)
        .json({ message: "Refresh token expired", success: false });
    }
    const accessToken = jwt.sign(
      { userId: session.userId },
      process.env["ACCESS_TOKEN_SECRET"],
      {
        expiresIn: ACCESS_TOKEN_TTL,
      }
    );
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log("Error in refreshToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
