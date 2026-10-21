'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, ProductDemo } from '@/types';
import { queryAssistantDemo } from '@/lib/assistant/assistantService';
import { ProductQuickViewModal } from '@/components/products/ProductQuickViewModal';

export interface ChatWidgetProps {
  onQuickViewProduct?: (product: ProductDemo) => void;
}

const RobotIcon: React.FC<{ isScanning?: boolean; className?: string }> = ({ isScanning = true, className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Antenna */}
    <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="2" r="1.5" fill="#60a5fa" />
    {/* Head */}
    <rect x="4" y="5" width="16" height="13" rx="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.8" />
    {/* Ears */}
    <rect x="2" y="9" width="2" height="5" rx="1" fill="currentColor" />
    <rect x="20" y="9" width="2" height="5" rx="1" fill="currentColor" />
    {/* Visor Area */}
    <g>
      <rect x="7" y="8.5" width="10" height="4" rx="2" fill="#0f172a" />
      {/* Eyes */}
      <circle cx="9.5" cy="10.5" r="1.25" fill="#38bdf8" />
      <circle cx="14.5" cy="10.5" r="1.25" fill="#38bdf8" />
      {isScanning && (
        <rect
          x="7"
          y="8.5"
          width="4"
          height="4"
          rx="1"
          fill="url(#scanGradient)"
          className="chat-eye-scanner"
        />
      )}
    </g>
    {/* Mouth / Speaker dots */}
    <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 2" />
    <defs>
      <linearGradient id="scanGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onQuickViewProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDemo | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const msgSeqRef = useRef(1);

  const initialMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'assistant',
    text: 'Namaste! Welcome to JK Enterprises. I am JK Assistant.\n\nI can assist you with product specifications, commercial procurement, formal quotation requests, statewide Rajasthan delivery, and payment verification.\n\nHow can I help you today?',
    timestamp: 'Just now',
    suggestedFollowUps: [
      'Tell me about your product categories',
      'How does bulk procurement and quotation work?',
      'What are your delivery charges across Rajasthan?',
      'How does manual payment verification work?',
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (selectedProduct) {
        setSelectedProduct(null);
      } else if (isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
  }, [selectedProduct, isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey);
      scrollToBottom();
      const timer = setTimeout(() => inputRef.current?.focus(), 120);
      return () => {
        window.removeEventListener('keydown', handleEscapeKey);
        clearTimeout(timer);
      };
    }
  }, [isOpen, handleEscapeKey, messages, isTyping]);

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
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      msgSeqRef.current += 1;
      const errorMsg: ChatMessage = {
        id: `error-msg-${msgSeqRef.current}`,
        sender: 'assistant',
        text: 'Our assistant service is momentarily unavailable. For immediate order or product assistance, please reach our Bikaner sales desk at +91 9928769266 or via WhatsApp.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetConversation = () => {
    setMessages([initialMessage]);
    setInputVal('');
  };

  const handleProductClick = (product: ProductDemo) => {
    if (onQuickViewProduct) {
      onQuickViewProduct(product);
    } else {
      setSelectedProduct(product);
    }
  };

  const showNameReveal = !isOpen && (isHovered || isFocused);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
        {/* Name Reveal Tooltip - Only shown on hover or keyboard focus of the launcher */}
        <div
          role="tooltip"
          id="assistant-tooltip"
          aria-hidden={!showNameReveal}
          className={`hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-900/95 text-white text-xs font-semibold shadow-lg border border-slate-700/80 transition-all duration-200 pointer-events-none backdrop-blur-xs ${
            showNameReveal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <span>JK Assistant</span>
        </div>

        {/* Floating Chat Panel Container */}
        {isOpen && (
          <div
            role="dialog"
            aria-modal="false"
            aria-label="JK Assistant Chat"
            className="fixed bottom-20 right-4 sm:right-6 w-[92vw] sm:w-[380px] md:w-[400px] h-[520px] max-h-[75vh] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200 z-50"
          >
            {/* Header */}
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <RobotIcon isScanning={false} className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-tight leading-tight text-white">JK Assistant</h3>
                  <p className="text-[11px] text-slate-400 font-normal leading-tight">
                    Inquiries & Sourcing Desk
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetConversation}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-blue-400"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-blue-400"
                  title="Close chat"
                  aria-label="Close JK Assistant"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 shadow-2xs whitespace-pre-line leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Embedded Recommended Products if any */}
                    {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Recommended Products:
                        </p>
                        <div className="space-y-1.5">
                          {msg.recommendedProducts.map((p) => (
                            <div
                              key={p.id}
                              className="p-2 bg-slate-50 hover:bg-blue-50/70 rounded-lg border border-slate-200 flex items-center justify-between gap-2 transition-colors"
                            >
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-900 text-[11px] truncate">
                                  {p.name}
                                </p>
                                <p className="text-[10px] text-blue-700 font-bold">
                                  ₹{p.demoPriceINR.toLocaleString('en-IN')}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleProductClick(p)}
                                className="px-2 py-1 bg-white hover:bg-blue-600 hover:text-white border border-slate-300 text-slate-700 rounded-md text-[10px] font-semibold shrink-0 transition-colors cursor-pointer"
                              >
                                View Specs
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Suggested Follow-up Chips on the last assistant message */}
                  {msg.suggestedFollowUps &&
                    msg.suggestedFollowUps.length > 0 &&
                    msg.id === messages[messages.length - 1].id &&
                    !isTyping && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[92%]">
                        {msg.suggestedFollowUps.map((chip, idx) => (
                          <button
                            key={`chip-${idx}`}
                            type="button"
                            onClick={() => handleSendMessage(chip)}
                            className="text-left text-[11px] px-2.5 py-1 bg-white hover:bg-blue-50 hover:border-blue-300 border border-slate-200/90 text-slate-700 rounded-lg transition-colors cursor-pointer shadow-2xs font-medium"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 max-w-[100px] bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about products, orders or delivery..."
                className="flex-1 text-xs px-3.5 py-2.5 bg-slate-100/80 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 transition-all placeholder:text-slate-400"
                aria-label="Ask JK Assistant a question"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputVal.trim() || isTyping}
                className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                aria-label="Send message"
              >
                <span>Send</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Trigger Launcher Button - Displays only the robot icon with orbital ring and scanning visor */}
        <div className="relative">
          {/* Subtle orbital dashed ring */}
          <div className="chat-orbital-ring" aria-hidden="true" />

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-describedby="assistant-tooltip"
            aria-label={isOpen ? 'Close JK Assistant' : 'Open JK Assistant'}
            className="chat-launcher-btn group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-blue-400 shadow-xl hover:shadow-2xl transition-all duration-200 border border-slate-700/80 flex items-center justify-center cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 select-none"
          >
            {isOpen ? (
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <RobotIcon isScanning={true} className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Internal Quick Specs Modal if triggered from chat */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};
