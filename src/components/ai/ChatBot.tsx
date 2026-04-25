"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Cpu, Sparkles, Database, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

// Simulated AI Knowledge Base
const KNOWLEDGE = [
  { keywords: ["servis", "tamir", "usta"], response: "Madya servis ağı 81 ilde aktiftir. Bölgesel ekiplerimiz yaklaşık 45 dakika içinde siber-tesisat ekipmanlarıyla adresinize ulaşır." },
  { keywords: ["akıllı", "vana", "sensör"], response: "MAZ (Madya Akış Zekası), evinizdeki tüm su akışını milisaniyeler içinde kontrol eder. Bir sızıntı algılandığında ana vanayı otomatik olarak kapatır." },
  { keywords: ["fiyat", "maliyet", "ücret"], response: "Dijital altyapı projelerimiz her binanın ihtiyacına göre özel olarak fiyatlandırılır. MAZ üzerinden bir keşif talebi oluşturabilirsiniz." },
  { keywords: ["merhaba", "selam"], response: "Merhaba! Ben Madya'nın yapay zeka çekirdeği MAZ. Tesisatınızın dijital geleceği hakkında ne bilmek istersiniz?" },
  { keywords: ["garanti", "güven"], response: "Tüm akıllı bileşenlerimiz 1986'dan beri süregelen Madya güvencesiyle 10 yıl değişim garantilidir." },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Sistem başlatıldı. Ben MAZ, Madya'nın akış zekasıyım. Size nasıl yardımcı olabilirim?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate "Real AI" thinking and multi-step response
    setTimeout(() => {
      let finalContent = "Üzgünüm, bu spesifik teknik veri setine erişimim kısıtlı. Ancak Madya'nın genel operasyonel standartları çerçevesinde yardımcı olabilirim.";
      
      const lowerInput = input.toLowerCase();
      const match = KNOWLEDGE.find(k => k.keywords.some(kw => lowerInput.includes(kw)));
      
      if (match) finalContent = match.response;

      setMessages(prev => [...prev, { role: "bot", content: finalContent }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            className="absolute bottom-24 right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] md:h-[600px] glass border border-cyber-blue/30 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_0_100px_rgba(0,243,255,0.1)] flex flex-col overflow-hidden bg-black/90 backdrop-blur-xl"
          >
            {/* AI HEADER */}
            <div className="p-8 border-b border-white/5 bg-gradient-to-r from-cyber-blue/20 to-transparent flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyber-blue animate-pulse" />
              <div className="flex items-center gap-4 relative z-10">
                 <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-cyber-blue/20 flex items-center justify-center border border-cyber-blue/40">
                       <Cpu className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyber-green rounded-full border-4 border-black" />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.3em] font-syncopate">MAZ v5.2</h3>
                    <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                       <Sparkles className="w-3 h-3 text-cyber-blue" /> Aktif Akış Zekası
                    </span>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-neutral-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* AI MESSAGES */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-black/95">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn("flex flex-col", msg.role === "user" ? "items-end" : "items-start")}
                >
                  <div className={cn(
                    "max-w-[90%] p-5 rounded-3xl text-[11px] font-mono leading-relaxed relative",
                    msg.role === "user" 
                      ? "bg-cyber-blue text-black font-bold rounded-tr-none shadow-[0_10px_30px_rgba(0,243,255,0.2)]" 
                      : "bg-neutral-900 text-white border border-white/20 rounded-tl-none"
                  )}>
                    {msg.content}
                    {msg.role === 'bot' && <Bot className="absolute -top-6 left-0 w-4 h-4 text-cyber-blue/40" />}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2 p-4 bg-white/5 rounded-2xl w-20 justify-center">
                   <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce" />
                   <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                   <span className="w-1.5 h-1.5 bg-cyber-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* AI INPUT */}
            <div className="p-8 border-t border-white/5 bg-black/60 relative">
              <div className="relative flex items-center gap-4">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="MAZ ile konuşun..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[10px] font-mono text-white focus:outline-none focus:border-cyber-blue/50 transition-all placeholder:text-neutral-700"
                />
                <button 
                  onClick={handleSend}
                  className="p-4 bg-cyber-blue text-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,243,255,0.3)]"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[7px] font-mono text-neutral-600 uppercase tracking-widest">
                 <Database className="w-2 h-2" /> Madya Veri Merkezi Güvenli Bağlantı
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING TRIGGER */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-20 h-20 rounded-[2rem] bg-black border border-cyber-blue/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 overflow-hidden shadow-[0_20px_80px_rgba(0,243,255,0.2)]"
      >
        <div className="absolute inset-0 bg-cyber-blue/5 group-hover:bg-cyber-blue/10 transition-colors" />
        {isOpen ? (
          <X className="text-white w-8 h-8 relative z-10" />
        ) : (
          <div className="relative z-10 flex flex-col items-center">
             <Bot className="text-cyber-blue w-8 h-8 animate-pulse" />
             <span className="text-[6px] text-cyber-blue font-mono mt-1 font-bold">MAZ</span>
          </div>
        )}
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-cyber-blue/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
