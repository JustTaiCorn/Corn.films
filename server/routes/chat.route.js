import express from "express";
import { chat, toServerSentEventsResponse, maxIterations } from "@tanstack/ai";
import { geminiText } from "@tanstack/ai-gemini";
import dotenv from "dotenv";
import { optionalVerifyToken } from "../middlewares/verifyToken.js";
import { createTools } from "../ai/tools/index.js";
import { SYSTEM_PROMPT } from "../ai/prompts.js";

dotenv.config();
const router = express.Router();

router.post("/ai", optionalVerifyToken, async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY not configured",
    });
  }

  const { messages = [], conversationId } = req.body || {};
  const userId = req.user?.id ?? null;

  try {
    const tools = createTools(userId);

    const messagesWithSystem = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    const stream = chat({
      adapter: geminiText("gemini-2.5-flash"),
      messages: messagesWithSystem,
      tools,
      conversationId,
      agentLoopStrategy: maxIterations(5),
    });

    const response = toServerSentEventsResponse(stream);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    await response.body.pipeTo(
      new WritableStream({
        write(chunk) {
          res.write(chunk);
        },
        close() {
          res.end();
        },
      }),
    );
  } catch (error) {
    console.error("[chat/ai] error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        error: error.message || "An error occurred",
      });
    } else {
      res.end();
    }
  }
});

export default router;
