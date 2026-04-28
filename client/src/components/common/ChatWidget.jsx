import { useState, useRef, useEffect, useMemo } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { API_URL } from "@/api/client/private.client";
import store from "@/redux/store";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);
    const accessToken = useSelector((state) => state.user.accessToken);

    const connection = useMemo(
        () =>
            fetchServerSentEvents(`${API_URL}/chat/ai`, () => {
                const token = store.getState().user.accessToken;
                const headers = { "Content-Type": "application/json" };
                if (token) headers["Authorization"] = `Bearer ${token}`;
                return { headers, credentials: "include" };
            }),
        // accessToken is read at request time via store.getState(), but we still
        // recreate the connection if it changes so token-aware retries work.
        [accessToken],
    );

    const { messages, sendMessage, isLoading } = useChat({ connection });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;
        sendMessage(trimmed);
        setInput("");
    };

    return (
        <>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(
                    "fixed bottom-5 right-5 z-[1500] flex items-center justify-center",
                    "h-14 w-14 rounded-full shadow-lg",
                    "bg-primary text-primary-foreground",
                    "cursor-pointer"
                )}
                aria-label="Toggle chat"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cn(
                            "fixed bottom-24 right-5 z-[1500]",
                            "w-[360px] max-h-[520px] flex flex-col",
                            "rounded-2xl border border-border bg-background shadow-2xl",
                            "overflow-hidden",

                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground">
                            <Bot className="h-5 w-5" />
                            <span className="font-semibold text-sm">Corn AI</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-auto hover:opacity-80 cursor-pointer"
                                aria-label="Close chat"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex-1 min-h-0 max-h-[380px] overflow-y-auto">
                            <div className="flex flex-col gap-3 p-4">
                                {messages.length === 0 && (
                                    <p className="text-muted-foreground text-xs text-center py-8">
                                        Hỏi bất cứ điều gì về phim 🎬
                                    </p>
                                )}

                                {messages.map((msg) => {
                                    const isUser = msg.role === "user";
                                    return (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex gap-2 max-w-[90%]",
                                                isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-xs",
                                                    isUser
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted text-muted-foreground"
                                                )}
                                            >
                                                {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                                            </div>
                                            <div
                                                className={cn(
                                                    "rounded-xl px-3 py-2 text-sm leading-relaxed",
                                                    isUser
                                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                        : "bg-muted text-foreground rounded-tl-sm"
                                                )}
                                            >
                                                {msg.parts?.map((part, idx) => {
                                                    if (part.type === "thinking") {
                                                        return (
                                                            <p key={idx} className="text-xs italic opacity-60 mb-1">
                                                                {part.content}
                                                            </p>
                                                        );
                                                    }
                                                    if (part.type === "text") {
                                                        return <p key={idx} className="whitespace-pre-wrap">{part.content}</p>;
                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}

                                {isLoading && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Spinner className="h-4 w-4" />
                                        <span className="text-xs">Đang trả lời...</span>
                                    </div>
                                )}

                                <div ref={bottomRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-2 p-3 border-t border-border"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Nhập tin nhắn..."
                                disabled={isLoading}
                                className={cn(
                                    "flex-1 bg-muted/50 text-foreground text-sm rounded-lg px-3 py-2",
                                    "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary",
                                    "disabled:opacity-50"
                                )}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading}
                                className="flex-shrink-0"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;