import jwt from "jsonwebtoken";
import crypto from "crypto";
export const ACCESS_TOKEN_TTL = "30m";
export const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export const generateTokenAndSetCookie = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env["ACCESS_TOKEN_SECRET"], {
    expiresIn: ACCESS_TOKEN_TTL,
  });
  const refreshToken = crypto.randomBytes(64).toString("hex");
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: REFRESH_TOKEN_TTL,
  });

  return { accessToken, refreshToken };
};
