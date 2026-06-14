"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, X, Send, UserCircle2, Trash2, Minimize2, Volume2, VolumeX, Palette, Terminal, HelpCircle } from "lucide-react";

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
    theme: ChatTheme;
    isMuted: boolean;
}

type ChatTheme = "mono" | "cyber" | "emerald" | "matrix";
type BotMood = "hyped" | "thinking" | "writing" | "online";

const CHAT_STORAGE_KEY = "stitchbyte_chat_history";
const CHAT_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

const DEFAULT_MESSAGE: Message = {
    role: "bot",
    content: "Yo! 👋 I'm StitchBot, your AI sidekick here at StitchByte!\n\nI can answer questions about:\n• Our web/app dev services\n• Our case studies (Lal Sweets, Tradescribe, etc.)\n• The wizards running our agency\n• WhatsApp CRM & Prebuilt SaaS\n\nWhat's on your mind? Ask away or type **/** for quick options! 🚀"
};

const HELPER_BUBBLES = [
    "Psst... Stuck? Let's chat! ⚡",
    "Ask about Lal Sweets case study! 🍬",
    "How much does a website cost? 💼",
    "Who is Mayur Bhargava? 🧙‍♂️",
    "Type /joke for a laugh! 🤓",
    "Check out the themes toggle! 🎨"
];

// Web Audio API Synthesizer for Retro digital sounds
const playSynthSound = (type: "click" | "chime" | "glitch" | "pop", isMuted: boolean) => {
    if (isMuted) return;
    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === "click") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(10, now + 0.05);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === "chime") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === "pop") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.start(now);
            osc.stop(now + 0.08);
        } else if (type === "glitch") {
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(100, now);
            osc.frequency.setValueAtTime(220, now + 0.04);
            osc.frequency.setValueAtTime(70, now + 0.08);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        }
    } catch (e) {
        // Ignored if browser blocks audio autoplay before user interaction
    }
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
    
    // Theme & Audio settings
    const [theme, setTheme] = useState<ChatTheme>("mono");
    const [isMuted, setIsMuted] = useState(false);
    const [mood, setMood] = useState<BotMood>("hyped");

    // Helper text cycle
    const [helperText, setHelperText] = useState(HELPER_BUBBLES[0]);
    const [showHelperBubble, setShowHelperBubble] = useState(false);

    // Slash command states
    const [showCommands, setShowCommands] = useState(false);
    const [selectedCommandIdx, setSelectedCommandIdx] = useState(0);

    const triggerRef = useRef<HTMLDivElement>(null);
    const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const QUICK_REPLIES = [
        "What services do you offer?",
        "How much does a website cost?",
        "Tell me about case studies",
        "Who is in the team?",
        "Tell me a joke!"
    ];

    const SLASH_COMMANDS = [
        { cmd: "/quote", desc: "Get ballpark price estimates" },
        { cmd: "/team", desc: "Meet the agency wizards" },
        { cmd: "/projects", desc: "Browse client case studies" },
        { cmd: "/joke", desc: "Hear a funky programmer joke" },
        { cmd: "/theme", desc: "Cycle through visual themes" }
    ];

    // Load history and preferences
    useEffect(() => {
        const loadPreferences = () => {
            try {
                const stored = localStorage.getItem(CHAT_STORAGE_KEY);
                if (stored) {
                    const data: StoredChatData = JSON.parse(stored);
                    const now = Date.now();

                    if (now - data.timestamp < CHAT_EXPIRY_MS) {
                        if (data.messages && data.messages.length > 0) {
                            setMessages(data.messages);
                            if (data.messages.length > 1) {
                                setShowQuickReplies(false);
                            }
                        }
                        if (data.userInfo && data.userInfo.name) {
                            setUserInfo(data.userInfo);
                        }
                        if (data.theme) {
                            setTheme(data.theme);
                        }
                        if (typeof data.isMuted === "boolean") {
                            setIsMuted(data.isMuted);
                        }
                    } else {
                        localStorage.removeItem(CHAT_STORAGE_KEY);
                    }
                }
            } catch (error) {
                console.error("Error loading chat history:", error);
            }
            setIsLoaded(true);
        };

        loadPreferences();

        // Delay helper bubble trigger
        const timer = setTimeout(() => {
            setShowHelperBubble(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Helper bubble rotator
    useEffect(() => {
        if (isOpen) {
            setShowHelperBubble(false);
            return;
        }

        const interval = setInterval(() => {
            setShowHelperBubble(false);
            setTimeout(() => {
                const randomText = HELPER_BUBBLES[Math.floor(Math.random() * HELPER_BUBBLES.length)];
                setHelperText(randomText);
                setShowHelperBubble(true);
            }, 500);
        }, 12000);

        return () => clearInterval(interval);
    }, [isOpen]);

    // Save preferences and chat history
    const saveChatHistory = useCallback(() => {
        if (!isLoaded) return;
        try {
            const data: StoredChatData = {
                messages,
                userInfo,
                theme,
                isMuted,
                timestamp: Date.now()
            };
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error("Error saving chat data:", error);
        }
    }, [messages, userInfo, theme, isMuted, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            saveChatHistory();
        }
    }, [messages, userInfo, theme, isMuted, isLoaded, saveChatHistory]);

    // Scroll chat window to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    // Keyboard mouse tracking for trigger magnetic pull
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isOpen || !triggerRef.current) {
                setMagneticOffset({ x: 0, y: 0 });
                return;
            }
            const rect = triggerRef.current.getBoundingClientRect();
            const triggerX = rect.left + rect.width / 2;
            const triggerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const dist = Math.hypot(mouseX - triggerX, mouseY - triggerY);
            if (dist < 110) {
                const pullX = (mouseX - triggerX) * 0.4;
                const pullY = (mouseY - triggerY) * 0.4;
                setMagneticOffset({ x: pullX, y: pullY });
            } else {
                setMagneticOffset({ x: 0, y: 0 });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isOpen]);

    // Input handlers
    const handleInputChange = (val: string) => {
        setInput(val);
        if (val.startsWith("/")) {
            const typedCmd = val.toLowerCase();
            const matched = SLASH_COMMANDS.filter(c => c.cmd.startsWith(typedCmd));
            setShowCommands(matched.length > 0);
            setSelectedCommandIdx(0);
        } else {
            setShowCommands(false);
        }
    };

    const handleSend = async (messageText?: string) => {
        const textToSend = messageText || input.trim();
        if (!textToSend) return;

        // Play short sound
        playSynthSound("click", isMuted);

        // Hide command helper
        setShowCommands(false);

        // Intercept slash commands
        if (textToSend.startsWith("/")) {
            handleSlashCommand(textToSend);
            setInput("");
            return;
        }

        setMessages(prev => [...prev, { role: "user", content: textToSend }]);
        setInput("");
        setIsTyping(true);
        setMood("thinking");
        setShowQuickReplies(false);

        // Set typing status timer
        const statusTimer = setTimeout(() => {
            setMood("writing");
        }, 120000000000000); // placeholder or long timeout logic

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: textToSend,
                    userInfo: userInfo.name ? userInfo : undefined
                })
            });

            const data = await response.json();
            
            // Trigger friendly receive chime
            playSynthSound("chime", isMuted);

            if (data.needsFollowUp && !userInfo.name) {
                setPendingQuestion(textToSend);
                setShowUserForm(true);
                setMessages(prev => [...prev, {
                    role: "bot",
                    content: data.answer + "\n\n💼 Drop your email or phone below, and our human wizards will connect with you to discuss details!"
                }]);
            } else {
                setMessages(prev => [...prev, { role: "bot", content: data.answer }]);
            }
        } catch (error) {
            console.error("Chat route error:", error);
            playSynthSound("glitch", isMuted);
            setMessages(prev => [...prev, {
                role: "bot",
                content: "Ouch! 💥 Connection glitch. Shoot us an email at info@stitchbyte.in, and we'll check it out!"
            }]);
        } finally {
            clearTimeout(statusTimer);
            setIsTyping(false);
            setMood("online");
        }
    };

    const handleSlashCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        
        // Add command to chat log as user message
        setMessages(prev => [...prev, { role: "user", content: cmd }]);
        
        setIsTyping(true);
        setMood("thinking");

        setTimeout(() => {
            let replyContent = "";
            playSynthSound("chime", isMuted);

            if (cleanCmd === "/quote") {
                replyContent = "💰 **Ballpark Estimates:**\n• Landing Page: ₹15k - ₹30k\n• Business Website: ₹40k - ₹80k\n• E-commerce: ₹80k - ₹2L+\n• Apps/SaaS Platforms: ₹1.5L+\n\nDrop your details to get a customized proposal!";
            } else if (cleanCmd === "/team") {
                replyContent = "🧙‍♂️ **Meet the StitchByte Wizards:**\n• **Mayur Bhargava** (CEO & Founder) - Master of codebase architecture.\n• **Dhruv** (Co-founder & AI/ML Specialist) - Wizard behind custom LLMs and databases.\n• **Mayank** (Designing Head) - Designer of beautiful pixel-perfect user journeys.";
            } else if (cleanCmd === "/projects") {
                replyContent = "🏆 **StitchByte Masterpieces:**\n• 🍬 *Lal Sweets Ecom* (Next.js + MongoDB)\n• 💎 *Kirtilals Luxury* (React + PostgreSQL)\n• 📈 *Tradescribe Platform* (React Native + Python)\n• 👗 *Murzban Fashion* (Shopify + React)\n\nType the project name to get more details!";
            } else if (cleanCmd === "/joke") {
                const jokes = [
                    "Why did the web developer go broke? Because he lost his domain! 💸",
                    "There are 10 types of people in this world: Those who understand binary, and those who don't. 🤓",
                    "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
                    "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?' 🍻"
                ];
                replyContent = jokes[Math.floor(Math.random() * jokes.length)] + " 😂";
            } else if (cleanCmd === "/theme") {
                const themesList: ChatTheme[] = ["mono", "cyber", "emerald", "matrix"];
                const nextIdx = (themesList.indexOf(theme) + 1) % themesList.length;
                setTheme(themesList[nextIdx]);
                replyContent = `🎨 Switched visual theme style to: **${themesList[nextIdx].toUpperCase()}**! How do I look?`;
            } else {
                replyContent = "🤖 Uh oh, that command is encrypted. Try typing `/` to see valid commands!";
            }

            setMessages(prev => [...prev, { role: "bot", content: replyContent }]);
            setIsTyping(false);
            setMood("online");
        }, 600);
    };

    const handleUserInfoSubmit = async () => {
        if (!userInfo.name || !userInfo.email) {
            return;
        }

        playSynthSound("click", isMuted);
        setShowUserForm(false);

        try {
            await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: pendingQuestion,
                    userInfo
                })
            });

            playSynthSound("chime", isMuted);
            setMessages(prev => [...prev, {
                role: "bot",
                content: `Awesome, ${userInfo.name}! 🚀\n\nI've pinged our human team. They will email you at ${userInfo.email} within 24 hours.\n\nAnything else I can decode for you?`
            }]);
        } catch (error) {
            console.error("Error saving user info:", error);
        }

        setPendingQuestion("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (showCommands) {
            const filtered = SLASH_COMMANDS.filter(c => c.cmd.startsWith(input.toLowerCase()));
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedCommandIdx(prev => (prev + 1) % filtered.length);
                return;
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedCommandIdx(prev => (prev - 1 + filtered.length) % filtered.length);
                return;
            }
            if (e.key === "Enter") {
                e.preventDefault();
                handleSend(filtered[selectedCommandIdx].cmd);
                return;
            }
        }

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const cycleTheme = () => {
        playSynthSound("click", isMuted);
        const themesList: ChatTheme[] = ["mono", "cyber", "emerald", "matrix"];
        const nextIdx = (themesList.indexOf(theme) + 1) % themesList.length;
        setTheme(themesList[nextIdx]);
    };

    const clearChat = () => {
        if (confirm("Clear our chat history?")) {
            playSynthSound("glitch", isMuted);
            setMessages([DEFAULT_MESSAGE]);
            setShowQuickReplies(true);
            setShowUserForm(false);
            localStorage.removeItem(CHAT_STORAGE_KEY);
        }
    };

    const toggleMute = () => {
        setIsMuted(prev => !prev);
        if (isMuted) {
            // Unmuting, play a small confirmation pop
            setTimeout(() => playSynthSound("pop", false), 50);
        }
    };

    // Apply classes based on active theme
    const getThemeClasses = () => {
        switch (theme) {
            case "cyber":
                return {
                    window: "bg-slate-950/95 border-fuchsia-950/80 shadow-[0_20px_50px_rgba(217,70,239,0.18)] text-slate-100",
                    header: "bg-gradient-to-r from-fuchsia-600 via-purple-700 to-indigo-600 text-white",
                    userBubble: "bg-gradient-to-r from-fuchsia-500 to-purple-650 text-white rounded-br-none shadow-[0_4px_12px_rgba(217,70,239,0.15)]",
                    botBubble: "bg-slate-900 border border-purple-950/50 text-slate-100 rounded-bl-none",
                    input: "bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-fuchsia-500/60 focus:ring-fuchsia-500/60",
                    btnSend: "bg-fuchsia-500 hover:bg-fuchsia-600 text-white",
                    btnQuick: "bg-slate-900 hover:bg-fuchsia-500/10 border-slate-800 hover:border-fuchsia-500/30 text-slate-300 hover:text-fuchsia-400",
                    avatarBorder: "border-white/10",
                    badgeText: "text-fuchsia-250",
                    moodDot: "bg-fuchsia-400",
                    iconColor: "text-fuchsia-400"
                };
            case "emerald":
                return {
                    window: "bg-slate-950/95 border-emerald-950/80 shadow-[0_20px_50px_rgba(16,185,129,0.18)] text-slate-100",
                    header: "bg-gradient-to-r from-emerald-500 via-teal-650 to-indigo-600 text-white",
                    userBubble: "bg-gradient-to-r from-emerald-500 to-teal-650 text-white rounded-br-none shadow-[0_4px_12px_rgba(16,185,129,0.15)]",
                    botBubble: "bg-slate-900 border border-emerald-950/50 text-slate-100 rounded-bl-none",
                    input: "bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/60 focus:ring-emerald-500/60",
                    btnSend: "bg-emerald-500 hover:bg-emerald-600 text-slate-950",
                    btnQuick: "bg-slate-900 hover:bg-emerald-500/10 border-slate-800 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400",
                    avatarBorder: "border-white/10",
                    badgeText: "text-emerald-250",
                    moodDot: "bg-emerald-400",
                    iconColor: "text-emerald-400"
                };
            case "matrix":
                return {
                    window: "bg-black border-green-500 shadow-[0_0_35px_rgba(34,197,94,0.25)] font-mono text-green-400 crt-scanlines crt-flicker",
                    header: "bg-black border-b border-green-500 text-green-500",
                    userBubble: "bg-green-950 border border-green-500 text-green-300 rounded-br-none",
                    botBubble: "bg-black border border-green-500/60 text-green-400 rounded-bl-none",
                    input: "bg-black border-green-500/60 text-green-400 placeholder:text-green-800 focus:border-green-400 focus:ring-green-400/50",
                    btnSend: "bg-green-500 hover:bg-green-600 text-black",
                    btnQuick: "bg-black hover:bg-green-950/30 border-green-500/50 hover:border-green-400 text-green-500 hover:text-green-300",
                    avatarBorder: "border-green-500/30",
                    badgeText: "text-green-400",
                    moodDot: "bg-green-500",
                    iconColor: "text-green-500"
                };
            case "mono":
            default:
                return {
                    window: "bg-zinc-950/95 border-zinc-850 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.04)] text-zinc-100",
                    header: "bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-b border-zinc-800 text-white",
                    userBubble: "bg-white text-black rounded-br-none shadow-[0_4px_12px_rgba(255,255,255,0.08)]",
                    botBubble: "bg-zinc-900/90 border border-zinc-800/80 text-zinc-100 rounded-bl-none",
                    input: "bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-white/50 focus:ring-white/30",
                    btnSend: "bg-white hover:bg-zinc-200 text-black",
                    btnQuick: "bg-zinc-900 hover:bg-white/5 border-zinc-800 hover:border-white/20 text-zinc-300 hover:text-white",
                    avatarBorder: "border-white/10",
                    badgeText: "text-zinc-400",
                    moodDot: "bg-white",
                    iconColor: "text-zinc-400"
                };
        }
    };

    const styles = getThemeClasses();

    // Map mood string to text label
    const getMoodText = () => {
        switch (mood) {
            case "thinking":
                return "StitchBot • Thinking... 🧠";
            case "writing":
                return "StitchBot • Coding reply... 💻";
            case "hyped":
                return "StitchBot • Hyped! ⚡";
            case "online":
            default:
                return "StitchBot • Active 💬";
        }
    };

    const handleTriggerClick = () => {
        if (!isOpen) {
            playSynthSound("pop", isMuted);
        } else {
            playSynthSound("click", isMuted);
        }
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Inject Matrix theme CSS variables self-contained */}
            {theme === "matrix" && (
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes matrix-scanline {
                        0% { transform: translateY(-100%); }
                        100% { transform: translateY(100%); }
                    }
                    .crt-scanlines::after {
                        content: " ";
                        display: block;
                        position: absolute;
                        top: 0; left: 0; bottom: 0; right: 0;
                        background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%);
                        z-index: 100;
                        background-size: 100% 4px;
                        pointer-events: none;
                    }
                    .crt-flicker {
                        animation: crt-flicker 0.2s infinite;
                    }
                    @keyframes crt-flicker {
                        0% { opacity: 0.99; }
                        50% { opacity: 1.0; }
                        100% { opacity: 0.995; }
                    }
                `}} />
            )}

            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/20 backdrop-blur-xs z-40 sm:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={`fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 sm:w-96 backdrop-blur-xl rounded-[2rem] border overflow-hidden animate-fade-in flex flex-col h-[530px] max-h-[82vh] transition-all duration-300 ${styles.window}`}>
                    
                    {/* Header */}
                    <div className={`px-5 py-4.5 flex items-center justify-between shadow-md relative ${styles.header}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-slate-950/40 rounded-full flex items-center justify-center border ${styles.avatarBorder} relative`}>
                                <Sparkles className="w-5 h-5 text-white animate-pulse" />
                                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-slate-950 rounded-full ${styles.moodDot}`} />
                            </div>
                            <div>
                                <p className="font-bold text-sm tracking-wide">StitchBot</p>
                                <p className={`text-[10px] font-semibold tracking-wider uppercase ${styles.badgeText}`}>{getMoodText()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 z-10">
                            {/* Theme Cycle button */}
                            <button
                                onClick={cycleTheme}
                                title="Change chatbot theme"
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                            >
                                <Palette className="w-4 h-4" />
                            </button>
                            {/* Mute button */}
                            <button
                                onClick={toggleMute}
                                title={isMuted ? "Unmute sounds" : "Mute sounds"}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                            >
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            {/* Clear chat button */}
                            <button
                                onClick={clearChat}
                                title="Clear chat history"
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            {/* Close/Minimize button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                title="Minimize chat"
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2.5 items-end ${msg.role === "user" ? "justify-end animate-slide-up" : "justify-start animate-fade-in"}`}
                            >
                                {msg.role === "bot" && (
                                    <div className={`w-7 h-7 bg-zinc-950 border ${theme === "matrix" ? "border-green-500 text-green-500" : "border-zinc-800 text-zinc-400"} rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <Sparkles className="w-3.5 h-3.5" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs sm:text-sm whitespace-pre-line leading-relaxed shadow-sm ${
                                        msg.role === "user" ? styles.userBubble : styles.botBubble
                                    }`}
                                >
                                    {msg.content}
                                </div>
                                {msg.role === "user" && (
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-zinc-950 border ${theme === "matrix" ? "border-green-500 text-green-500" : "border-zinc-800 text-zinc-400"}`}>
                                        <UserCircle2 className="w-4.5 h-4.5" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* User Info Lead Capture Form */}
                        {showUserForm && (
                            <div className={`bg-zinc-900 border p-5 rounded-2xl space-y-3.5 animate-slide-up ${theme === "matrix" ? "border-green-500" : "border-zinc-800"}`}>
                                <p className={`text-xs font-bold uppercase tracking-widest ${styles.iconColor}`}>Human Connection Request:</p>
                                <div className="space-y-2.5">
                                    <input
                                        type="text"
                                        placeholder="Your Name *"
                                        value={userInfo.name}
                                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                        className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border outline-none focus:ring-1 focus:ring-offset-0 transition-all ${styles.input}`}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address *"
                                        value={userInfo.email}
                                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                        className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border outline-none focus:ring-1 focus:ring-offset-0 transition-all ${styles.input}`}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number (Optional)"
                                        value={userInfo.phone}
                                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                        className={`w-full px-3.5 py-2 text-xs rounded-xl bg-slate-950 border outline-none focus:ring-1 focus:ring-offset-0 transition-all ${styles.input}`}
                                    />
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <button
                                        onClick={handleUserInfoSubmit}
                                        disabled={!userInfo.name || !userInfo.email}
                                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${styles.btnSend}`}
                                    >
                                        Beam Me Up
                                    </button>
                                    <button
                                        onClick={() => setShowUserForm(false)}
                                        className="px-4 py-2.5 text-zinc-400 text-xs hover:text-zinc-200 bg-zinc-950 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-colors"
                                    >
                                        Skip
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-2.5 items-end">
                                <div className={`w-7 h-7 bg-zinc-950 border ${theme === "matrix" ? "border-green-500 text-green-500" : "border-zinc-800 text-zinc-400"} rounded-full flex items-center justify-center`}>
                                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                </div>
                                <div className={`px-4 py-3 rounded-2xl rounded-bl-none border ${styles.botBubble}`}>
                                    <div className="flex gap-1.5 py-1">
                                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === "matrix" ? "bg-green-500" : theme === "cyber" ? "bg-fuchsia-500" : theme === "emerald" ? "bg-emerald-500" : "bg-white"}`} style={{ animationDelay: "0ms" }} />
                                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === "matrix" ? "bg-green-500" : theme === "cyber" ? "bg-fuchsia-500" : theme === "emerald" ? "bg-emerald-500" : "bg-white"}`} style={{ animationDelay: "150ms" }} />
                                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${theme === "matrix" ? "bg-green-500" : theme === "cyber" ? "bg-fuchsia-500" : theme === "emerald" ? "bg-emerald-500" : "bg-white"}`} style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Suggested Questions in a Column inside the Scroll Area */}
                        {showQuickReplies && messages.length <= 1 && (
                            <div className="pt-2.5 space-y-2 animate-fade-in">
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest pl-1">Jump start queries:</p>
                                <div className="flex flex-col gap-1.5 max-w-[85%]">
                                    {QUICK_REPLIES.map((reply, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(reply)}
                                            className={`w-full text-left px-4 py-2.5 text-xs rounded-xl border transition-all duration-300 ${styles.btnQuick}`}
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Slash Command Helper Popup */}
                    {showCommands && (
                        <div className={`mx-4 mb-1 p-2 bg-zinc-900/95 border rounded-2xl max-h-40 overflow-y-auto space-y-1 z-20 shadow-lg ${theme === "matrix" ? "border-green-500 text-green-400" : "border-zinc-800 text-zinc-200"}`}>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 border-b border-zinc-800 pb-1.5 text-[9px] font-bold text-zinc-500 tracking-widest uppercase">
                                <Terminal className="w-3.5 h-3.5" />
                                Quick Commands:
                            </div>
                            {SLASH_COMMANDS.filter(c => c.cmd.startsWith(input.toLowerCase())).map((cmdItem, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(cmdItem.cmd)}
                                    onMouseEnter={() => setSelectedCommandIdx(i)}
                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-xl text-left transition-all ${
                                        selectedCommandIdx === i 
                                            ? (theme === "matrix" ? "bg-green-950 text-green-300" : theme === "cyber" ? "bg-fuchsia-950/45 text-fuchsia-300" : theme === "emerald" ? "bg-emerald-950/45 text-emerald-300" : "bg-zinc-800 text-white")
                                            : "hover:bg-zinc-850"
                                    }`}
                                >
                                    <span className="font-semibold">{cmdItem.cmd}</span>
                                    <span className="text-[10px] text-zinc-500">{cmdItem.desc}</span>
                                </button>
                            ))}
                        </div>
                    )}



                    {/* Input Box */}
                    <div className="p-4 border-t border-zinc-900/60 bg-transparent z-10">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => handleInputChange(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask something, or type '/'..."
                                className={`flex-1 px-4 py-2.5 border rounded-2xl text-xs sm:text-sm outline-none transition-all ${styles.input}`}
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${styles.btnSend}`}
                            >
                                <Send className="w-4.5 h-4.5" />
                            </button>
                        </div>
                        <p className="text-[8px] text-zinc-650 text-center mt-2.5 tracking-wider uppercase font-semibold">
                            StitchBot v3.0 • Cyber Systems
                        </p>
                    </div>
                </div>
            )}

            {/* Pulsing Floating Trigger Button */}
            <div 
                ref={triggerRef}
                style={{
                    transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                    transition: magneticOffset.x === 0 ? "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)" : "none"
                }}
                className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3.5 pointer-events-auto"
            >
                {/* Floating Helper Speech Bubble */}
                {showHelperBubble && !isOpen && (
                    <div 
                        onClick={handleTriggerClick}
                        className="bg-black text-white hover:scale-103 active:scale-98 border border-zinc-800 text-xs px-4 py-2.5 rounded-2xl shadow-xl animate-fade-in cursor-pointer max-w-xs whitespace-nowrap z-50 select-none relative mb-1"
                        style={{
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.05)"
                        }}
                    >
                        {helperText}
                        <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-black border-r border-b border-zinc-800 rotate-45" />
                    </div>
                )}

                <div className="relative">
                    {!isOpen && (
                        <span className="absolute -inset-1.5 rounded-full bg-white/10 animate-ping opacity-60 pointer-events-none" />
                    )}
                    <button
                        onClick={handleTriggerClick}
                        className="relative w-14 h-14 bg-black hover:bg-zinc-900 border border-zinc-850 rounded-full flex items-center justify-center shadow-2xl hover:scale-108 active:scale-95 transition-all group"
                        style={{
                            boxShadow: "0 0 30px rgba(255, 255, 255, 0.05), inset 0 2px 4px rgba(255, 255, 255, 0.2)"
                        }}
                    >
                        {isOpen ? (
                            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white group-hover:scale-105 transition-transform">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.457 5.704 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
