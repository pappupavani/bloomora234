import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  User, 
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const STORAGE_KEY = 'woolandbloom_chat_history';
const SESSION_KEY = 'woolandbloom_chat_session_id';

const QUICK_PROMPTS = [
  "🌸 What bouquets do you have?",
  "🎨 How do custom orders work?",
  "🚚 How long does delivery take?",
  "🧶 What yarn do you use?"
];

export const Chatboard: React.FC = () => {
  const { isChatOpen, setIsChatOpen, pendingChatPrompt, setPendingChatPrompt } = useCart();
  const [hasUnread, setHasUnread] = useState(true);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Session ID for n8n conversation memory
  const [sessionId, setSessionId] = useState<string>(() => {
    try {
      const existing = localStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      const created = `wb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(SESSION_KEY, created);
      return created;
    } catch {
      return `wb_${Date.now()}`;
    }
  });

  // Message list state
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: `Hello and welcome to **${SITE_CONFIG.name}**! 🌸\n\nI am your floral concierge. Whether you're looking for an everlasting rose bouquet, a custom color combination for a gift, or details on our handmade milk-cotton yarn, I'm here to help!\n\nWhat can I assist you with today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll when messages change or panel opens
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen, isLoading]);

  // Persist messages in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage errors
    }
  }, [messages]);

  // Focus input when opened and process any pending prompt
  useEffect(() => {
    if (isChatOpen) {
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);

      if (pendingChatPrompt) {
        const promptToSend = pendingChatPrompt;
        setPendingChatPrompt(null);
        handleSendMessage(promptToSend);
      }
    }
  }, [isChatOpen, pendingChatPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setError(null);
    setInput('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch(SITE_CONFIG.n8nChatWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          chatInput: query,
          message: query,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      
      // Parse output from n8n response (n8n chat returns { output: "..." } or { text: "..." })
      let replyText = '';
      if (typeof data === 'string') {
        replyText = data;
      } else if (data && typeof data === 'object') {
        replyText = 
          data.output || 
          data.text || 
          data.message || 
          data.response || 
          (Array.isArray(data) && data[0]?.output) || 
          (Array.isArray(data) && data[0]?.text) || 
          (Array.isArray(data) && data[0]?.message) ||
          JSON.stringify(data);
      } else {
        replyText = "Thank you! I've received your note.";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Error connecting to n8n chat:', err);
      setError('Unable to reach the assistant right now. You can retry or chat directly on WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const newSession = `wb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSession);
    try {
      localStorage.setItem(SESSION_KEY, newSession);
    } catch {
      // ignore
    }
    const resetGreeting: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'assistant',
      text: `Hello! 🌸 Starting a fresh conversation. How can I assist you with your flower bouquet or custom order?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([resetGreeting]);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to format text with bold, bullet points, line breaks
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Replace **bold** with <strong>
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-semibold text-[#2E2927]">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <span key={idx} className="block leading-relaxed min-h-[1.2em]">
          {formattedParts}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
          {/* Subtle Attention Bubble on first visit */}
          {hasUnread && (
            <div 
              onClick={() => setIsChatOpen(true)}
              className="mb-2 px-3.5 py-1.5 bg-white text-[#2E2927] rounded-full shadow-md border border-[#EDE7E1] text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:shadow-lg transition-all animate-bounce"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C86D7A]" />
              <span>Chat with Concierge 🌸</span>
            </div>
          )}

          <button
            onClick={() => setIsChatOpen(true)}
            className="p-4 bg-[#C86D7A] hover:bg-[#B55D6A] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center relative group"
            aria-label="Open Chatboard Concierge"
          >
            <MessageCircle className="w-6 h-6 fill-white/20" />
            
            {/* Live Green Online Dot */}
            <span className="absolute top-1 right-1 w-3 h-3 bg-[#44D62C] border-2 border-white rounded-full" />

            {/* Tooltip on hover */}
            <span className="sr-only">Open Chat</span>
          </button>
        </div>
      )}

      {/* Chatboard Window */}
      {isChatOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[560px] max-h-[85vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#EDE7E1] flex flex-col overflow-hidden animate-slideUp"
        >
          {/* Header */}
          <div className="p-4 bg-[#FFFFFF] border-b border-[#EDE7E1] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-[#FCECEE] flex items-center justify-center text-[#C86D7A] border border-[#F2D7D9] shadow-inner">
                <Sparkles className="w-5 h-5 text-[#C86D7A]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-display font-medium text-base text-[#2E2927] flex items-center gap-1.5">
                  <span>{SITE_CONFIG.name} Concierge</span>
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#8C807C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span>Online · n8n Connected</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 text-[#8C807C] hover:text-[#2E2927] hover:bg-[#F2ECE6] rounded-lg transition-colors"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 text-[#8C807C] hover:text-[#2E2927] hover:bg-[#F2ECE6] rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF8F5]">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#FCECEE] text-[#C86D7A] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[82%] space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#C86D7A] text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-[#4A4240] border border-[#EDE7E1] rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>
                  <div
                    className={`text-[10px] text-[#A89E9A] px-1 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#E8DDD8] text-[#523E3A] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing / Loading indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-[#FCECEE] text-[#C86D7A] flex items-center justify-center shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white border border-[#EDE7E1] rounded-2xl rounded-bl-xs shadow-2xs text-xs flex items-center gap-2 text-[#7F7470]">
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A] animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A] animate-pulse [animation-delay:200ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86D7A] animate-pulse [animation-delay:400ms]" />
                  </span>
                  <span className="text-[11px] italic">Stitching reply...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-[#FFF3F3] border border-[#FAD2D2] rounded-2xl text-xs text-[#9E3636] space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#D9534F] shrink-0 mt-0.5" />
                  <p className="flex-1">{error}</p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    className="px-3 py-1 bg-[#D9534F] text-white rounded-lg text-[11px] font-semibold hover:bg-[#C9302C]"
                  >
                    Retry
                  </button>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello! I was using the chat on Wool & Bloom and wanted to ask: ')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-[#25D366] text-white rounded-lg text-[11px] font-semibold hover:bg-[#20bd5a] flex items-center gap-1"
                  >
                    <span>Chat on WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts (if chat is fresh or waiting) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 py-2 bg-white/70 border-t border-[#EDE7E1] overflow-x-auto flex gap-1.5 scrollbar-none">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 text-[11px] bg-white border border-[#EDE7E1] hover:border-[#C86D7A] hover:bg-[#FCECEE] hover:text-[#823846] rounded-full text-[#5E5552] whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-[#EDE7E1]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about bouquets, custom orders..."
                disabled={isLoading}
                className="flex-1 text-xs px-3.5 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#D9CECE] text-[#2E2927] placeholder:text-[#A89E9A] focus:outline-hidden focus:border-[#C86D7A] transition-colors disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-[#C86D7A] hover:bg-[#B55D6A] disabled:opacity-40 disabled:hover:bg-[#C86D7A] text-white rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            <div className="pt-2 flex items-center justify-between text-[10px] text-[#A89E9A] px-1">
              <span>Wool &amp; Bloom AI Concierge</span>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#25D366] transition-colors flex items-center gap-1"
              >
                <span>Human help on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
