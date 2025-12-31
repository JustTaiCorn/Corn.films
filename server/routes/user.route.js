import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  refreshToken,
  resetPassword,
  signup,
  updatepassword,
  updateProfile,
  updateAvatar,
  verifyEmail,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import requestHandler from "../handlers/request.handler.js";
import favoriteController from "../controllers/favorite.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/favorites", verifyToken, favoriteController.getFavoritesOfUser);

router.post(
  "/favorites",
  verifyToken,
  requestHandler.validate,
  favoriteController.addFavorite
);

router.delete(
  "/favorites/:favoriteId",
  verifyToken,
  favoriteController.removeFavorite
);

router.put(
  "/update-password",
  verifyToken,
  requestHandler.validate,
  updatepassword
);
router.put(
  "/update-profile",
  verifyToken,
  requestHandler.validate,
  updateProfile
);

router.post(
  "/update-avatar",
  verifyToken,
  upload.single("avatar"),
  updateAvatar
);

router.post("/refresh-token", refreshToken);
export default router;
