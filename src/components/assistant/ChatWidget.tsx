'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, ProductDemo } from '@/types';
import { queryAssistantDemo } from '@/lib/assistant/assistantService';
import { Badge } from '@/components/ui/Badge';
import { ProductQuickViewModal } from '@/components/products/ProductQuickViewModal';

export interface ChatWidgetProps {
  onQuickViewProduct?: (product: ProductDemo) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onQuickViewProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDemoProduct, setSelectedDemoProduct] = useState<ProductDemo | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'assistant',
    text: 'Namaste! Welcome to JK Enterprises. I am your Virtual IT & Hardware Advisor (Demo Mode).\n\nI can assist you with SSD recommendations, DDR4 vs DDR5 RAM compatibility, processor selection, school computer lab networking, and Rajasthan B2B inquiry procedures.\n\nHow can I help with your IT requirements today?',
    timestamp: 'Just now',
    suggestedFollowUps: [
      'Recommend an SSD for office workstation upgrades',
      'What is the difference between DDR4 and DDR5?',
      'Show networking gear for school computer labs',
      'How does wholesale & B2B pricing work?',
      'Tell me about Rajasthan statewide delivery',
    ],
    isDemoReply: true,
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (selectedDemoProduct) {
        setSelectedDemoProduct(null);
      } else {
        setIsOpen(false);
      }
    }
  }, [selectedDemoProduct]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey, messages, isTyping]);

  const msgSeqRef = useRef(1);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    msgSeqRef.current += 1;
    const currentSeq = msgSeqRef.current;

    const userMsg: ChatMessage = {
      id: `user-msg-${currentSeq}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    try {
      const response = await queryAssistantDemo(query);
      msgSeqRef.current += 1;
      const assistantMsg: ChatMessage = {
        id: `assistant-msg-${msgSeqRef.current}`,
        sender: 'assistant',
        text: response.message,
        timestamp: 'Just now',
        recommendedProducts: response.recommendedProducts,
        suggestedFollowUps: response.suggestedFollowUps,
        isDemoReply: true,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      msgSeqRef.current += 1;
      const errorMsg: ChatMessage = {
        id: `error-msg-${msgSeqRef.current}`,
        sender: 'assistant',
        text: 'Apologies, I encountered a temporary simulation issue. Please try another sample question.',
        timestamp: 'Just now',
        isDemoReply: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetConversation = () => {
    setMessages([initialMessage]);
  };

  const handleProductClick = (product: ProductDemo) => {
    if (onQuickViewProduct) {
      onQuickViewProduct(product);
    } else {
      setSelectedDemoProduct(product);
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
        {/* Floating Chat Modal Panel */}
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="JK Enterprises Virtual IT Advisor"
            className="w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white p-3.5 flex items-center justify-between border-b border-blue-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-lg shadow-inner" aria-hidden="true">
                  🤖
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm leading-tight">JK Hardware Advisor</h3>
                    <Badge variant="demo" size="sm" className="bg-amber-400 text-slate-950 font-bold text-[9px] py-0 px-1.5">
                      Demo Mode
                    </Badge>
                  </div>
                  <p className="text-[10px] text-blue-200">
                    Pre-configured IT Hardware Guidance
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-300">
                <button
                  type="button"
                  onClick={handleResetConversation}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors text-xs cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  🔄
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors text-base cursor-pointer"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Demo Safeguard Notice Banner */}
            <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 text-[11px] text-amber-900 flex items-center justify-between gap-1">
              <span>
                <strong>Safe Demo Assistant:</strong> Uses mock technical knowledge. No external AI keys or live databases invoked in Stage A.
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 bg-slate-50/60 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-xs whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Embedded Recommended Products */}
                    {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Referenced Demo Hardware:
                        </p>
                        <div className="space-y-1.5">
                          {msg.recommendedProducts.map((p) => (
                            <div
                              key={p.id}
                              className="p-2 bg-slate-50 hover:bg-blue-50/60 rounded-xl border border-slate-200 flex items-center justify-between gap-2 transition-colors"
                            >
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-900 text-[11px] truncate">
                                  {p.name}
                                </p>
                                <p className="text-[10px] text-slate-500">
                                  Demo Price: <strong className="text-slate-900">₹{p.demoPriceINR.toLocaleString('en-IN')}</strong>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleProductClick(p)}
                                className="px-2 py-1 bg-white hover:bg-blue-600 hover:text-white text-blue-700 text-[10px] font-semibold rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer"
                              >
                                View Specs
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-1 px-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {msg.isDemoReply && (
                      <span className="text-[9px] text-amber-700 bg-amber-50 px-1 rounded border border-amber-200">
                        Demo Knowledge
                      </span>
                    )}
                  </div>

                  {/* Suggested Follow-up Chips on the last assistant message */}
                  {msg.suggestedFollowUps && msg === messages[messages.length - 1] && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((chip, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSendMessage(chip)}
                          className="text-left text-[11px] px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-full border border-slate-200/90 shadow-2xs transition-colors cursor-pointer"
                        >
                          💡 {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-white p-2.5 rounded-2xl w-fit border border-slate-200">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-[11px] text-slate-500 font-medium">Consulting hardware knowledge...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about SSDs, DDR5 RAM, CPUs, B2B wholesale..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all disabled:opacity-50"
                aria-label="Ask assistant a hardware question"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputVal.trim() || isTyping}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                aria-label="Send message"
              >
                <span>Send</span>
                <span aria-hidden="true">➤</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Trigger Launcher Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-blue-700 to-slate-900 hover:from-blue-800 hover:to-black text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-white/20 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close JK Enterprises Hardware Assistant' : 'Open JK Enterprises Hardware Assistant'}
        >
          <span className="text-xl group-hover:scale-110 transition-transform" aria-hidden="true">
            {isOpen ? '✕' : '🤖'}
          </span>
          <div className="text-left">
            <span className="text-xs font-bold block leading-tight">
              {isOpen ? 'Close Advisor' : 'Hardware AI Advisor'}
            </span>
            <span className="text-[10px] text-amber-300 font-medium block">
              Safe Demo Mode
            </span>
          </div>
        </button>
      </div>

      {/* Internal Quick Specs Modal if triggered from chat */}
      <ProductQuickViewModal
        product={selectedDemoProduct}
        onClose={() => setSelectedDemoProduct(null)}
      />
    </>
  );
};
