import express from "express";
import historyController from "../controllers/history.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";
const router = express.Router();
router.post("/", verifyToken, historyController.addToHistory);
router.get("/", verifyToken, historyController.getHistory);
router.delete("/:historyId", verifyToken, historyController.removeFromHistory);
router.delete("/", verifyToken, historyController.clearHistory);

export default router;
