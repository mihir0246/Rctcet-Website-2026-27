import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const BOT_URL = `${import.meta.env.VITE_CHATBOT_API_URL}/chat`;

export const Chatbot = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hello! I am **Roto**. Ask me anything about RC-TCET.",
    },
  ]);
  const [requestLog, setRequestLog] = useState([]);

  const messagesEndRef = useRef(null);

  const hintMessages = useMemo(
    () => ["Hi! I am Roto, your RC-TCET assistant."],
    []
  );

  // useEffect(() => {
  //   if (!isChatOpen) {
  //     const timer = setInterval(() => {
  //       setShowHint(false);
  //     }, 5000);
  //     return () => clearInterval(timer);
  //   }
  // }, [isChatOpen]);

  useEffect(() => {
    if (!isChatOpen) {
      const timer = setInterval(() => {
        setShowHint(prev => !prev);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const normalizeBotText = (data) => {
    if (typeof data === "string") return data;
    if (!data || typeof data !== "object") return "No response received.";
    return (
      data.response ||
      data.answer ||
      data.message ||
      data.reply ||
      JSON.stringify(data)
    );
  };

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setIsLoading(true);

    const formattedHistory = messages.map((msg) => ({
      role: msg.role === "bot" ? "assistant" : "user",
      content: msg.content,
    }));

    const payload = {
      query: question,
      history: formattedHistory,
    };

    setRequestLog((prev) => [
      ...prev,
      {
        question,
        payload,
        endpoint: BOT_URL,
        requestedAt: new Date().toISOString(),
      },
    ]);

    try {
      const response = await axios.post(BOT_URL, payload);
      const botText = normalizeBotText(response.data);
      setMessages((prev) => [...prev, { role: "bot", content: botText }]);
    } catch (error) {
      const errorText =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch response from chatbot service.";
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `I could not reach the chatbot endpoint.\n\n${errorText}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isChatOpen && (
        <div className="relative">
          {showHint && (
            <div
              className="
                fixed bottom-28 right-6 z-[10000]
                max-w-[260px]
                bg-white/90 dark:bg-black/80 backdrop-blur-md
                text-foreground font-medium
                text-sm
                px-5 py-3.5
                rounded-2xl rounded-br-sm
                shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                border border-white/20 dark:border-white/10
                animate-fade-in-up
              "
            >
              {hintMessages.map((item, index) => (
                <p key={index} className="leading-relaxed">
                  <span>{item}</span>
                </p>
              ))}
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setChatOpen(true);
              setShowHint(false);
            }}
            className="
              fixed bottom-6 right-6 z-[10000]
              w-16 h-16 rounded-full
              bg-card
              shadow-[0_10px_30px_rgba(110,159,159,0.4)]
              border-2 border-primary/50
              hover:scale-110 hover:shadow-[0_15px_40px_rgba(110,159,159,0.6)]
              transition-all duration-300
              flex items-center justify-center
              overflow-hidden
            "
          >
            <img
              src="https://res.cloudinary.com/dtlessn0g/image/upload/v1770378415/WhatsApp_Image_2026-02-06_at_4.54.12_PM_gkfoyr.jpg"
              alt="RC TCET Bot"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      )}

      {isChatOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setChatOpen(false);
              setShowHint(false);
            }
          }}
        >
          <div
            className="
              fixed bottom-4 left-1/2 -translate-x-1/2
              w-[94vw] h-[75vh]
              sm:bottom-24 sm:right-8 sm:left-auto sm:translate-x-0
              sm:w-[400px] sm:h-[600px]
              bg-white/90 dark:bg-black/80
              backdrop-blur-3xl
              border border-white/20 dark:border-white/10
              rounded-[2.5rem]
              shadow-[0_20px_50px_rgba(0,0,0,0.3)]
              flex flex-col
              overflow-hidden
              animate-fade-in-up
            "
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-hover px-6 py-5 text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                  <img
                    src="https://res.cloudinary.com/dtlessn0g/image/upload/v1770378415/WhatsApp_Image_2026-02-06_at_4.54.12_PM_gkfoyr.jpg"
                    alt="Roto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight tracking-wide">Roto</h2>
                  <p className="text-[11px] font-medium opacity-90 uppercase tracking-widest">
                    RC TCET Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setChatOpen(false);
                  setShowHint(false);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white font-bold"
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 px-5 py-6 overflow-y-auto space-y-4 custom-scrollbar bg-black/5 dark:bg-white/5">
              {messages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 shadow-md ${msg.role === "user"
                        ? "bg-primary text-white rounded-2xl rounded-br-sm"
                        : "bg-white dark:bg-gray-800 text-foreground rounded-2xl rounded-bl-sm border border-black/5 dark:border-white/5"
                      }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/10 dark:prose-pre:bg-white/10 prose-pre:text-foreground">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-5 py-4 rounded-2xl rounded-bl-sm shadow-md bg-white dark:bg-gray-800 text-foreground border border-black/5 dark:border-white/5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 dark:bg-black/50 backdrop-blur-md border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-full px-2 py-2 shadow-inner">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask me anything..."
                  className="
                    flex-1 px-4 py-2 bg-transparent
                    text-sm text-foreground font-medium
                    resize-none custom-scrollbar
                    focus:outline-none placeholder:text-muted
                    max-h-24
                  "
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-primary hover:bg-primary-hover text-white disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-md"
                >
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <div className="mt-2 text-center text-[10px] text-muted font-medium uppercase tracking-wider">
                RC-TCET Assistant v2.0
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Chatbot;