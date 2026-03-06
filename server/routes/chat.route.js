import express from "express";
import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { geminiText } from "@tanstack/ai-gemini";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/ai", async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY not configured",
    });
  }

  const { messages, conversationId } = req.body;

  try {
    const stream = chat({
      adapter: geminiText("gemini-2.5-flash"),
      messages,
      conversationId,
    });

    const response = toServerSentEventsResponse(stream);

    res.setHeader("Content-Type", "text/event-stream");
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
    res.status(500).json({
      error: error.message || "An error occurred",
    });
  }
});

export default router;
