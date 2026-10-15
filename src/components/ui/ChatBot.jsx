import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiXMark,
    HiPaperAirplane,
    HiArrowPath,
    HiChatBubbleLeftRight,
    HiWifi,
    HiBuildingOffice2,
    HiHome,
    HiWrenchScrewdriver,
    HiCheckCircle,
} from "react-icons/hi2";

// ─── Constants ─────────────────────────────────────────────────────────────────
const WA_NUMBER = "919632790919";

// ─── Validation ────────────────────────────────────────────────────────────────
const isValidMobile = (v) => /^[6-9]\d{9}$/.test(v.trim());
const isValidPin = (v) => /^\d{6}$/.test(v.trim());

// ─── Plan data ─────────────────────────────────────────────────────────────────
const HOME_PLANS = [
    { id: "starter", name: "Starter", price: "₹699/mo", speed: "100 Mbps", tag: "Best Value" },
    { id: "pro", name: "Pro", price: "₹999/mo", speed: "200 Mbps", tag: "Most Popular" },
    { id: "premium", name: "Premium", price: "₹1299/mo", speed: "300 Mbps", tag: "Unlimited" },
];

const BUSINESS_PLANS = [
    { id: "biz_basic", name: "Business Basic", price: "₹1499/mo", speed: "200 Mbps", tag: "SME" },
    { id: "biz_pro", name: "Business Pro", price: "₹2499/mo", speed: "500 Mbps", tag: "Popular" },
    { id: "biz_dedicate", name: "Dedicated Leased", price: "₹4999/mo", speed: "1 Gbps", tag: "Enterprise" },
];

// ─── Quick fixes per issue ─────────────────────────────────────────────────────
const QUICK_FIXES = {
    no_internet: "Try these steps:\n1️⃣ Restart your router (unplug → wait 30s → plug back)\n2️⃣ Check all cable connections\n3️⃣ Verify the power LED on router is solid green",
    slow_speed: "Try these steps:\n1️⃣ Restart your router\n2️⃣ Move closer to the router\n3️⃣ Disconnect devices not in use\n4️⃣ Run a speed test at fast.com",
    billing: "For billing queries:\n1️⃣ Check your registered email for invoices\n2️⃣ Payments take up to 24hrs to reflect\n3️⃣ Use UPI/NEFT to the account shown on invoice",
    install_delay: "For installation follow-up:\n1️⃣ Check your SMS for the scheduled date\n2️⃣ Our team works 9am–7pm Mon–Sat\n3️⃣ We'll reach out 1hr before arrival",
};

// ─── State machine identifiers ─────────────────────────────────────────────────
const S = {
    INITIAL: "initial",
    CUSTOMER_TYPE: "customerTypeSelection",
    // — New customer track —
    CONNECTION_TYPE: "connectionTypeSelection",
    AVAILABILITY: "availabilityCheck",
    PLAN_RECOMMEND: "planRecommendation",
    SCHEDULE: "scheduleInstallation",
    COLLECT_NAME: "collectName",
    COLLECT_MOBILE: "collectMobile",
    CONFIRM: "confirmSubmission",
    // — Existing customer track —
    ISSUE_SELECT: "issueSelection",
    QUICK_FIX: "quickFixStep",
    ISSUE_RESOLVED: "issueResolvedCheck",
    COLLECT_REG_MOBILE: "collectRegisteredMobile",
    CONFIRM_TICKET: "confirmTicket",
    // — Shared —
    COMPLETE: "complete",
};

// ─── Initial form data ─────────────────────────────────────────────────────────
const blankForm = () => ({
    customerType: "",
    connectionType: "",
    city: "",
    pincode: "",
    planName: "",
    issueType: "",
    scheduleInstall: "",
    name: "",
    mobile: "",
    timestamp: "",
});

// ─── Welcome message ───────────────────────────────────────────────────────────
const welcomeMsg = () => ({
    type: "bot",
    text: "👋 Hi! I'm **Avicii**.\n\nWelcome to **KRP Networks** – High-Speed Fiber Internet serving Hosur, Thalli & Denkanikottai.\n\nHow can I help you today?",
    timestamp: new Date(),
    buttons: [
        { label: "🏠 I'm a New Customer", value: "new" },
        { label: "🔧 I'm an Existing Customer", value: "existing" },
    ],
});

// ─── WhatsApp message builder ──────────────────────────────────────────────────
const buildWAMessage = (data) => {
    const lines = [
        `🌐 *KRP Networks – ${data.customerType === "new" ? "New Lead" : "Support Ticket"}*`,
        `━━━━━━━━━━━━━━━━━━━━`,
    ];

    if (data.customerType === "new") {
        lines.push(
            `👤 *Name:* ${data.name}`,
            `📱 *Mobile:* ${data.mobile}`,
            `🔌 *Connection:* ${data.connectionType === "home" ? "Home Internet" : "Business Internet"}`,
            `🏙️ *Area:* ${data.city}`,
            `📍 *Pincode:* ${data.pincode}`,
            `📦 *Plan Interest:* ${data.planName}`,
        );
        if (data.scheduleInstall) lines.push(`📅 *Schedule Install:* ${data.scheduleInstall}`);
    } else {
        const issueLabels = {
            no_internet: "No Internet",
            slow_speed: "Slow Speed",
            billing: "Billing Issue",
            install_delay: "Installation Delay",
        };
        lines.push(
            `📱 *Registered Mobile:* ${data.mobile}`,
            `🔧 *Issue:* ${issueLabels[data.issueType] || data.issueType}`,
        );
    }

    lines.push(
        `━━━━━━━━━━━━━━━━━━━━`,
        `🕐 *Time:* ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    );

    return lines.join("\n");
};

const openWhatsApp = (data) => {
    const msg = buildWAMessage(data);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
};

// ─── Component ─────────────────────────────────────────────────────────────────
const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([welcomeMsg()]);
    const [conversationState, setConvState] = useState(S.INITIAL);
    const [formData, setFormData] = useState(blankForm());
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
    }, [isOpen]);

    // ─── Message helpers ───────────────────────────────────────────────────────
    const push = (msg) =>
        setMessages((p) => [...p, { ...msg, timestamp: new Date() }]);

    const botReply = (text, buttons = null, delay = 700) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            push({ type: "bot", text, buttons });
        }, delay);
    };

    const userMsg = (text) => push({ type: "user", text });

    const resetConversation = () => {
        setMessages([welcomeMsg()]);
        setConvState(S.INITIAL);
        setFormData(blankForm());
        setInputValue("");
        setIsTyping(false);
    };

    // ─── State machine ─────────────────────────────────────────────────────────
    const advance = (displayText, value) => {
        userMsg(displayText);
        setInputValue("");

        switch (conversationState) {

            // ── Welcome: new vs existing ──────────────────────────────────────────
            case S.INITIAL: {
                const type = value; // "new" | "existing"
                setFormData((p) => ({ ...p, customerType: type }));

                if (type === "new") {
                    setConvState(S.CONNECTION_TYPE);
                    botReply(
                        "Great! What type of connection do you need?",
                        [
                            { label: "🏠 Home Internet", value: "home" },
                            { label: "🏢 Business Internet", value: "business" },
                        ]
                    );
                } else {
                    setConvState(S.ISSUE_SELECT);
                    botReply(
                        "I'm here to help! What issue are you facing?",
                        [
                            { label: "📡 No Internet", value: "no_internet" },
                            { label: "🐢 Slow Speed", value: "slow_speed" },
                            { label: "💳 Billing Issue", value: "billing" },
                            { label: "🔨 Installation Delay", value: "install_delay" },
                        ]
                    );
                }
                break;
            }

            // ── New: connection type ───────────────────────────────────────────────
            case S.CONNECTION_TYPE: {
                setFormData((p) => ({ ...p, connectionType: value }));
                setConvState(S.AVAILABILITY);
                botReply(
                    value === "home"
                        ? "Perfect! We provide fiber up to **300 Mbps** for homes. 🏠\n\nWhat's your **pincode**? (We'll check coverage instantly)"
                        : "Great! We offer dedicated fiber up to **1 Gbps** for businesses. 🏢\n\nWhat's your **pincode**?"
                );
                break;
            }

            // ── New: pincode / availability check ──────────────────────────────────
            case S.AVAILABILITY: {
                if (!isValidPin(value)) {
                    botReply("⚠️ Please enter a valid **6-digit pincode**.");
                    break;
                }
                setFormData((p) => ({ ...p, pincode: value }));
                setConvState(S.PLAN_RECOMMEND);
                botReply("✅ Great news! **Fiber is available** in your area. 🎉", null, 400);

                // Show plans after a short delay
                const plans = formData.connectionType === "business" ? BUSINESS_PLANS : HOME_PLANS;
                const planButtons = plans.map((pl) => ({
                    label: `${pl.tag} · ${pl.name} ${pl.speed} – ${pl.price}`,
                    value: pl.id,
                    meta: pl,
                }));

                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        setIsTyping(false);
                        push({
                            type: "bot",
                            text: "Here are our plans for your area. Which suits you best?",
                            buttons: planButtons,
                        });
                    }, 700);
                }, 1000);
                break;
            }

            // ── New: plan selection ────────────────────────────────────────────────
            case S.PLAN_RECOMMEND: {
                const allPlans = [...HOME_PLANS, ...BUSINESS_PLANS];
                const chosen = allPlans.find((p) => p.id === value);
                const planName = chosen ? `${chosen.name} (${chosen.speed} – ${chosen.price})` : value;
                setFormData((p) => ({ ...p, planName }));
                setConvState(S.SCHEDULE);
                botReply(
                    `Excellent choice! 🚀\n\nWould you like to **schedule an installation**?`,
                    [
                        { label: "📅 Yes, schedule now", value: "yes" },
                        { label: "💬 I'll decide later", value: "later" },
                    ]
                );
                break;
            }

            // ── New: schedule installation ─────────────────────────────────────────
            case S.SCHEDULE: {
                setFormData((p) => ({ ...p, scheduleInstall: value === "yes" ? "Requested" : "Later" }));
                setConvState(S.COLLECT_NAME);
                botReply("Almost there! What's your **full name**?");
                break;
            }

            // ── New: collect name ──────────────────────────────────────────────────
            case S.COLLECT_NAME: {
                if (value.length < 2) {
                    botReply("⚠️ Please enter your full name.");
                    break;
                }
                setFormData((p) => ({ ...p, name: value }));
                setConvState(S.COLLECT_MOBILE);
                botReply(`Thanks, **${value}**! 📱 What's your **mobile number**?`);
                break;
            }

            // ── New: collect mobile ────────────────────────────────────────────────
            case S.COLLECT_MOBILE: {
                if (!isValidMobile(value)) {
                    botReply("⚠️ Please enter a valid **10-digit Indian mobile number**.");
                    break;
                }
                const updated = { ...formData, mobile: value };
                setFormData(updated);
                setConvState(S.CONFIRM);
                botReply(
                    `Here's your summary:\n\n📦 Plan: **${updated.planName}**\n👤 Name: **${updated.name}**\n📱 Mobile: **${value}**\n\nShall we connect you with our team on WhatsApp to confirm?`,
                    [
                        { label: "✅ Yes, Connect on WhatsApp", value: "confirm" },
                        { label: "🔄 Start Over", value: "reset" },
                    ]
                );
                break;
            }

            // ── New: confirm & submit ──────────────────────────────────────────────
            case S.CONFIRM: {
                if (value === "reset") { resetConversation(); break; }
                const finalData = { ...formData, timestamp: new Date().toISOString() };
                openWhatsApp(finalData);
                setConvState(S.COMPLETE);
                botReply(
                    "🎉 All set! **WhatsApp has opened** with your details pre-filled.\n\nOur team will confirm your installation within **24 hours**. Thank you for choosing KRP Networks!",
                    [{ label: "🔄 Start New Conversation", value: "reset" }],
                    400
                );
                break;
            }

            // ── Existing: issue selection ──────────────────────────────────────────
            case S.ISSUE_SELECT: {
                setFormData((p) => ({ ...p, issueType: value }));
                setConvState(S.QUICK_FIX);
                const fix = QUICK_FIXES[value] || "Please try restarting your router first.";
                botReply(`Let me help! Here's a quick fix:\n\n${fix}`, null, 500);
                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        setIsTyping(false);
                        push({
                            type: "bot",
                            text: "Did this resolve your issue?",
                            buttons: [
                                { label: "✅ Yes, it's fixed!", value: "resolved" },
                                { label: "❌ No, still having issue", value: "not_resolved" },
                            ],
                        });
                    }, 700);
                }, 1600);
                break;
            }

            // ── Existing: was issue resolved? ──────────────────────────────────────
            case S.ISSUE_RESOLVED: {
                if (value === "resolved") {
                    setConvState(S.COMPLETE);
                    botReply(
                        "🎉 Glad it's fixed! Happy to help anytime.\n\nIs there anything else you need?",
                        [
                            { label: "🏠 Go to Main Menu", value: "menu" },
                            { label: "🔄 Start New Conversation", value: "reset" },
                        ],
                        400
                    );
                } else {
                    setConvState(S.COLLECT_REG_MOBILE);
                    botReply("No worries, I'll raise a support ticket. 🎫\n\nPlease enter your **registered mobile number**:");
                }
                break;
            }

            // ── Existing: collect registered mobile ───────────────────────────────
            case S.COLLECT_REG_MOBILE: {
                if (!isValidMobile(value)) {
                    botReply("⚠️ Please enter your valid **10-digit registered mobile number**.");
                    break;
                }
                const updated = { ...formData, mobile: value };
                setFormData(updated);
                setConvState(S.CONFIRM_TICKET);
                botReply(
                    `Support ticket details:\n\n🔧 Issue: **${updated.issueType.replace(/_/g, " ")}**\n📱 Mobile: **${value}**\n\nShall I raise this ticket on WhatsApp for priority support?`,
                    [
                        { label: "✅ Yes, Raise Ticket via WhatsApp", value: "confirm" },
                        { label: "🔄 Start Over", value: "reset" },
                    ]
                );
                break;
            }

            // ── Existing: confirm support ticket ──────────────────────────────────
            case S.CONFIRM_TICKET: {
                if (value === "reset") { resetConversation(); break; }
                const finalData = { ...formData, timestamp: new Date().toISOString() };
                openWhatsApp(finalData);
                setConvState(S.COMPLETE);
                botReply(
                    "✅ Ticket raised! **WhatsApp has opened** with your issue details.\n\nOur technician will reach you within **2 hours**. Thank you for your patience!",
                    [{ label: "🔄 Start New Conversation", value: "reset" }],
                    400
                );
                break;
            }

            // ── Complete / menu fallback ───────────────────────────────────────────
            case S.COMPLETE:
            case S.QUICK_FIX: {
                if (value === "reset") { resetConversation(); break; }
                if (value === "menu") { resetConversation(); break; }
                break;
            }

            default:
                break;
        }
    };

    // The ISSUE_RESOLVED state uses buttons only — handled via handleButton
    const handleButton = (btn) => {
        if (btn.value === "reset" || btn.value === "menu") {
            userMsg(btn.label);
            resetConversation();
            return;
        }

        // For issue resolved check, the state is set from quickFixStep buttons
        if (conversationState === S.QUICK_FIX) {
            userMsg(btn.label);
            setFormData((p) => p);
            // Manually handle the transition since state is QUICK_FIX
            if (btn.value === "resolved") {
                setConvState(S.COMPLETE);
                botReply(
                    "🎉 Glad it's fixed! Happy to help anytime.",
                    [{ label: "🔄 Start New Conversation", value: "reset" }],
                    400
                );
            } else {
                setConvState(S.COLLECT_REG_MOBILE);
                botReply("No worries, I'll raise a support ticket. 🎫\n\nPlease enter your **registered mobile number**:");
            }
            return;
        }

        advance(btn.label, btn.value);
    };

    const handleSend = () => {
        const trimmed = inputValue.trim();
        if (!trimmed || isSendDisabled) return;
        advance(trimmed, trimmed);
    };

    // ─── Input sanitisation ────────────────────────────────────────────────────
    const isMobileState = [S.COLLECT_MOBILE, S.COLLECT_REG_MOBILE].includes(conversationState);
    const isPinState = conversationState === S.AVAILABILITY;

    const handleInputChange = (e) => {
        let raw = e.target.value;
        if (isMobileState || isPinState) {
            // Strip everything that isn't a digit
            raw = raw.replace(/\D/g, "");
            // Cap length
            if (isMobileState) raw = raw.slice(0, 10);
            if (isPinState) raw = raw.slice(0, 6);
        }
        setInputValue(raw);
    };

    // Disable send until digit requirement met
    const isSendDisabled = (() => {
        if (isMobileState) return inputValue.length < 10;
        if (isPinState) return inputValue.length < 6;
        return !inputValue.trim();
    })();

    // Inline hint shown beneath the input
    const inputHint = (() => {
        if (isMobileState && inputValue.length > 0 && inputValue.length < 10)
            return `${10 - inputValue.length} more digit${10 - inputValue.length > 1 ? "s" : ""} needed`;
        if (isPinState && inputValue.length > 0 && inputValue.length < 6)
            return `${6 - inputValue.length} more digit${6 - inputValue.length > 1 ? "s" : ""} needed`;
        return null;
    })();

    // ─── States that need free text input ────────────────────────────────────
    const textStates = [S.AVAILABILITY, S.COLLECT_NAME, S.COLLECT_MOBILE, S.COLLECT_REG_MOBILE];
    const showInput = textStates.includes(conversationState);

    const inputPlaceholder = {
        [S.AVAILABILITY]: "Enter 6-digit pincode…",
        [S.COLLECT_NAME]: "Enter your full name…",
        [S.COLLECT_MOBILE]: "Enter mobile number…",
        [S.COLLECT_REG_MOBILE]: "Enter registered mobile…",
    }[conversationState] ?? "Type a message…";

    const inputType = isMobileState ? "tel" : "text";

    // ─── Markdown-lite bold renderer ─────────────────────────────────────────
    const renderText = (text) =>
        text.split(/\*\*(.*?)\*\*/g).map((seg, i) =>
            i % 2 === 1
                ? <strong key={i} className="text-white font-semibold">{seg}</strong>
                : <span key={i}>{seg}</span>
        );

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <>
            {/* ── Chatbot FAB ── */}
            <motion.button
                onClick={() => setIsOpen((p) => !p)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.15, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.93 }}
                aria-label="Toggle KRP chat assistant"
                className="fixed z-[999] flex items-center justify-center rounded-full cursor-pointer text-white
                           bottom-[140px] right-[15px] w-[50px] h-[50px]
                           md:bottom-[94px] md:right-5 md:w-[58px] md:h-[58px]"
                style={{
                    background: "linear-gradient(135deg, #06b6d4, #2563eb)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                        <motion.span key="close"
                            initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                            <HiXMark style={{ width: 24, height: 24 }} />
                        </motion.span>
                    ) : (
                        <motion.span key="open"
                            initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                            <HiChatBubbleLeftRight style={{ width: 24, height: 24 }} />
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Notification dot */}
                {!isOpen && <>
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 animate-ping opacity-75" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500" />
                </>}
            </motion.button>

            {/* ── Chat window ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="fixed z-[998] w-[calc(100vw-24px)] max-w-[360px] flex flex-col rounded-2xl border border-white/10 shadow-2xl overflow-hidden
                                   bottom-[205px] right-[15px]
                                   md:bottom-[170px] md:right-5"
                        style={{ maxHeight: "min(560px, calc(100dvh - 210px))", background: "#0d1117" }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent-600 to-accent-500 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                                    <HiWifi className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm leading-tight">Avicii</p>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <p className="text-white/70 text-[10px]">Online · KRP Networks</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={resetConversation}
                                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/15 transition-colors"
                                    aria-label="Reset conversation">
                                    <HiArrowPath className="w-4 h-4" />
                                </button>
                                <button onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/15 transition-colors"
                                    aria-label="Close chat">
                                    <HiXMark className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
                            <AnimatePresence initial={false}>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className="max-w-[85%]">
                                            {/* Bot avatar for first bot msg in sequence */}
                                            {msg.type === "bot" && (
                                                <div className="flex items-end gap-1.5 mb-1">
                                                    <div className="w-5 h-5 rounded-full bg-accent-500/30 flex items-center justify-center flex-shrink-0">
                                                        <HiWifi className="w-3 h-3 text-accent-400" />
                                                    </div>
                                                    <span className="text-[9px] text-slate-500 ml-0.5">Avicii</span>
                                                </div>
                                            )}

                                            {/* Bubble */}
                                            <div className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.type === "user"
                                                ? "bg-accent-500 text-white rounded-br-sm ml-auto"
                                                : "bg-white/6 text-slate-200 rounded-bl-sm border border-white/8"
                                                }`}>
                                                {msg.type === "bot" ? renderText(msg.text) : msg.text}
                                            </div>

                                            {/* Quick reply buttons — only on last message */}
                                            {msg.buttons && idx === messages.length - 1 && (
                                                <div className="mt-2 flex flex-col gap-1.5">
                                                    {msg.buttons.map((btn, bi) => (
                                                        <motion.button
                                                            key={bi}
                                                            onClick={() => handleButton(btn)}
                                                            whileHover={{ scale: 1.01 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            className="w-full text-left text-xs px-3 py-2.5 rounded-xl bg-white/5 hover:bg-accent-500/20 border border-white/10 hover:border-accent-500/50 text-slate-300 hover:text-white transition-all duration-200"
                                                        >
                                                            {btn.label}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Timestamp */}
                                            <p className={`text-[9px] text-slate-600 mt-1 ${msg.type === "user" ? "text-right" : "text-left"}`}>
                                                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start">
                                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/6 border border-white/8 flex items-center gap-1.5">
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                className="w-1.5 h-1.5 rounded-full bg-slate-400"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Text input — only for pincode / name / mobile states */}
                        {showInput && (
                            <div className="px-3 pt-2.5 pb-3 border-t border-white/8 bg-black/20 flex-shrink-0">
                                <div className={`flex items-center gap-2 bg-white/6 border rounded-xl px-3 py-2 transition-colors ${inputHint ? "border-amber-500/40" : "border-white/10"
                                    }`}>
                                    <input
                                        ref={inputRef}
                                        type={inputType}
                                        inputMode={isMobileState || isPinState ? "numeric" : "text"}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        placeholder={inputPlaceholder}
                                        className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none min-w-0"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={isSendDisabled}
                                        className="p-1.5 rounded-lg bg-accent-500 disabled:bg-white/8 disabled:text-slate-600 text-white transition-colors flex-shrink-0"
                                    >
                                        <HiPaperAirplane className="w-4 h-4" />
                                    </button>
                                </div>
                                {inputHint && (
                                    <p className="mt-1.5 text-[10px] text-amber-400/80 pl-1">{inputHint}</p>
                                )}
                            </div>
                        )}

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
