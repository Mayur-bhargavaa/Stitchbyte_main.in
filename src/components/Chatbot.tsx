"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, X, Send, MessageCircle, UserCircle2 } from "lucide-react";

interface Message {
    role: "user" | "bot";
    content: string;
}

interface UserInfo {
    name: string;
    email: string;
    phone: string;
}

interface StoredChatData {
    messages: Message[];
    userInfo: UserInfo;
    timestamp: number;
}

const QUICK_REPLIES = [
    "What services do you offer?",
    "How much does a website cost?",
    "How do you work?",
    "How do I get started?"
];

const CHAT_STORAGE_KEY = "stitchbyte_chat_history";
const CHAT_EXPIRY_MS = 60 * 60 * 1000; // 1 hour in milliseconds

const DEFAULT_MESSAGE: Message = {
    role: "bot",
    content: "Hi! 👋 I'm StitchBot, your AI assistant for StitchByte.\n\nI can help you with:\n• Our services & products\n• Pricing information\n• Project timelines\n• Technologies we use\n• Getting started\n\nWhat would you like to know?"
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([DEFAULT_MESSAGE]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const [showUserForm, setShowUserForm] = useState(false);
    const [pendingQuestion, setPendingQuestion] = useState("");
    const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "", phone: "" });
    const [isLoaded, setIsLoaded] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load chat history from localStorage on mount
    useEffect(() => {
        const loadChatHistory = () => {
            try {
                const stored = localStorage.getItem(CHAT_STORAGE_KEY);
                if (stored) {
                    const data: StoredChatData = JSON.parse(stored);
                    const now = Date.now();

                    // Check if chat history is within 1 hour
                    if (now - data.timestamp < CHAT_EXPIRY_MS) {
                        if (data.messages && data.messages.length > 0) {
                            setMessages(data.messages);
                            // Hide quick replies if there's already a conversation
                            if (data.messages.length > 1) {
                                setShowQuickReplies(false);
                            }
                        }
                        if (data.userInfo && data.userInfo.name) {
                            setUserInfo(data.userInfo);
                        }
                    } else {
                        // Clear expired chat history
                        localStorage.removeItem(CHAT_STORAGE_KEY);
                    }
                }
            } catch (error) {
                console.error("Error loading chat history:", error);
                localStorage.removeItem(CHAT_STORAGE_KEY);
            }
            setIsLoaded(true);
        };

        loadChatHistory();
    }, []);

    // Save chat history to localStorage whenever messages or userInfo changes
    const saveChatHistory = useCallback(() => {
        if (!isLoaded) return; // Don't save before initial load

        try {
            const data: StoredChatData = {
                messages,
                userInfo,
                timestamp: Date.now()
            };
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error("Error saving chat history:", error);
        }
    }, [messages, userInfo, isLoaded]);

    useEffect(() => {
        if (isLoaded && messages.length > 0) {
            saveChatHistory();
        }
    }, [messages, userInfo, isLoaded, saveChatHistory]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (messageText?: string) => {
        const textToSend = messageText || input.trim();
        if (!textToSend) return;

        setMessages(prev => [...prev, { role: "user", content: textToSend }]);
        setInput("");
        setIsTyping(true);
        setShowQuickReplies(false);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: textToSend,
                    userInfo: userInfo.name ? userInfo : undefined
                })
            });

            const data = await response.json();

            if (data.needsFollowUp && !userInfo.name) {
                setPendingQuestion(textToSend);
                setShowUserForm(true);
                setMessages(prev => [...prev, {
                    role: "bot",
                    content: data.answer + "\n\n💼 Would you like our team to get back to you with more details? Please share your contact info below."
                }]);
            } else {
                setMessages(prev => [...prev, { role: "bot", content: data.answer }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: "bot",
                content: "I'm having trouble connecting right now. Please try again or email us at info@stitchbyte.in"
            }]);
        }

        setIsTyping(false);
    };

    const handleUserInfoSubmit = async () => {
        if (!userInfo.name || !userInfo.email) {
            return;
        }

        setShowUserForm(false);

        // Save to database via API
        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: pendingQuestion,
                    userInfo
                })
            });

            setMessages(prev => [...prev, {
                role: "bot",
                content: `Thank you, ${userInfo.name}! 🙏\n\nOur team will contact you at ${userInfo.email} within 24 hours to help with your query.\n\nIs there anything else I can help you with?`
            }]);
        } catch (error) {
            console.error('Error saving user info:', error);
        }

        setPendingQuestion("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleQuickReply = (reply: string) => {
        handleSend(reply);
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold">StitchBot</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    <p className="text-xs text-gray-300">AI-Powered • Ask me anything</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "bot" && (
                                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${msg.role === "user"
                                        ? "bg-gray-900 text-white rounded-br-md"
                                        : "bg-white text-gray-800 rounded-bl-md shadow-md border border-gray-100"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                                {msg.role === "user" && (
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                        <UserCircle2 className="w-5 h-5 text-gray-500" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* User Info Form */}
                        {showUserForm && (
                            <div className="bg-gray-100 p-4 rounded-xl space-y-3">
                                <p className="text-sm font-medium text-gray-700">Share your details:</p>
                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder:text-gray-500"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder:text-gray-500"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder:text-gray-500"
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUserInfoSubmit}
                                        disabled={!userInfo.name || !userInfo.email}
                                        className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => setShowUserForm(false)}
                                        className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-200 rounded-lg"
                                    >
                                        Skip
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-md border border-gray-100">
                                    <div className="flex gap-1.5">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    {showQuickReplies && messages.length <= 2 && (
                        <div className="px-3 pb-2 pt-1 border-t border-gray-100 bg-gray-50">
                            <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {QUICK_REPLIES.map((reply, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuickReply(reply)}
                                        className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs rounded-full hover:bg-gray-100 hover:border-gray-300 transition-colors"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your question..."
                                className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-colors placeholder:text-gray-500"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 text-center mt-2">
                            Powered by StitchByte AI
                        </p>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 bg-gray-900 hover:bg-gray-800`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-6 h-6 text-white" />
                )}
            </button>
        </>
    );
}
