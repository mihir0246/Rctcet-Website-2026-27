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
        "Hello! I am the **Roto**. Ask me anything about RC-TCET.",
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
        <div>
          {showHint && (
            <div
              className="
                fixed bottom-28 right-6 z-[10000]
                max-w-[260px]
                bg-white
                text-gray-700
                text-sm
                px-4 py-3
                rounded-2xl
                shadow-lg
                border border-orange-100
              "
            >
              {hintMessages.map((item, index) => (
                <p key={index} className="leading-relaxed">
                  <span>{item}</span>
                </p>
              ))}
              <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-white rotate-45 border-r border-b border-orange-100" />
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setChatOpen(true);
              setShowHint(false);
            }}
            className="
              fixed bottom-5 right-5 z-[10000]
              w-20 h-20 rounded-full
              bg-white
              shadow-2xl
              hover:scale-105 transition
              flex items-center justify-center
            "
          >
            <img
              src="https://res.cloudinary.com/dtlessn0g/image/upload/v1770378415/WhatsApp_Image_2026-02-06_at_4.54.12_PM_gkfoyr.jpg"
              alt="RC TCET Bot"
              className="w-full h-full rounded-full object-cover pointer-events-none"
            />
          </button>
        </div>
      )}

      {isChatOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40"
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
              w-[92vw] h-[60vh]
              sm:bottom-16 sm:right-4 sm:left-auto sm:translate-x-0
              sm:w-[360px] sm:h-[72vh]
              bg-gradient-to-br from-orange-50 to-white
              rounded-3xl
              shadow-2xl
              flex flex-col
              overflow-hidden
            "
          >
            <div className="bg-[#EA580C] p-4 text-white flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg">Roto</h2>
                <p className="text-xs opacity-90">
                  Service • Leadership • Fellowship
                </p>
              </div>
              <button
                onClick={() => {
                  setChatOpen(false);
                  setShowHint(false);
                }}
                className="text-xl font-bold"
                aria-label="Close chatbot"
              >
                x
              </button>
            </div>

            <div className="flex-1 px-4 py-5 text-sm text-gray-700 overflow-y-auto space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow ${msg.role === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white/90 text-gray-800"
                      }`}
                  >
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-pre:whitespace-pre-wrap">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl p-3 shadow bg-white/90 text-gray-700">
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-3 py-1 bg-white border-t text-[11px] text-gray-500">
              Requests sent: {requestLog.length}
            </div>

            <div className="p-3 bg-white border-t flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask me anything..."
                className="
                  flex-1 px-4 py-2 rounded-2xl
                  border border-orange-200
                  text-sm text-gray-700
                  bg-orange-50
                  resize-none
                  focus:outline-none focus:ring-2 focus:ring-orange-300
                "
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-full bg-orange-500 text-white disabled:opacity-40"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Chatbot;