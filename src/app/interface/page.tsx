"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Shield, Cpu, MessageSquare, User, Mail, Crosshair, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
export default function InterfacePage() {
  const [msg, setMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<string[]>([]);
  const handleSend = () => {
    setIsSending(true);
    setStatus(["BAĞLANTI_KURULUYOR...", "VERİ_PAKETLERİ_HAZIRLANIYOR...", "ŞİFRELEME: AES-256..."]);
    setTimeout(() => {
      setStatus(prev => [...prev, "SİNYAL_GÖNDERİLDİ: BAŞARILI"]);
      setTimeout(() => {
        setIsSending(false);
        setMsg("");
        setStatus([]);
      }, 2000);
    }, 2000);
  };
  return (
    <main className="min-h-screen bg-black flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden selection:bg-cyber-blue selection:text-black">
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[120px] animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-orange/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>
      <div className="container mx-auto max-w-[1400px] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
           <div className="lg:col-span-4 space-y-6 flex flex-col">
              <div className="glass p-10 rounded-[3rem] border border-white/5 bg-black/40 flex-1 space-y-10">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 bg-cyber-blue rounded-full animate-ping" />
                       <span className="text-[10px] font-mono text-cyber-blue tracking-[0.4em] uppercase">Sinyal Merkezi v5.2</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-syncopate text-white uppercase tracking-tighter leading-none">
                       DİJİTAL <br /> <span className="text-outline text-transparent opacity-30">ARAYÜZ</span>
                    </h1>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: "Protokol", val: "SİBER-AKIŞ v4", icon: Shield },
                      { label: "Gecikme", val: "2.4ms", icon: Activity },
                      { label: "Güvenlik", val: "AES-256", icon: Cpu }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <item.icon className="w-4 h-4 text-cyber-blue" />
                         </div>
                         <div className="space-y-1">
                            <span className="block text-[8px] text-neutral-500 uppercase font-mono tracking-widest">{item.label}</span>
                            <span className="text-xs font-bold text-white font-mono">{item.val}</span>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                    <span className="block text-[8px] text-neutral-500 uppercase font-mono">Terminal_Log</span>
                    <div className="space-y-2 max-h-40 overflow-y-auto no-scrollbar">
                       {status.length === 0 ? (
                         <p className="text-[10px] font-mono text-neutral-600 italic">Sinyal bekleniyor...</p>
                       ) : (
                         status.map((log, i) => (
                           <motion.p 
                             initial={{ opacity: 0, x: -10 }} 
                             animate={{ opacity: 1, x: 0 }} 
                             key={i} 
                             className="text-[10px] font-mono text-cyber-blue"
                           >
                             {">"} {log}
                           </motion.p>
                         ))
                       )}
                    </div>
                 </div>
              </div>
           </div>
           <div className="lg:col-span-8">
              <div className="glass p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 bg-black/60 backdrop-blur-3xl h-full flex flex-col justify-between">
                 <div className="space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-4 group">
                          <label className="flex items-center gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                             <User className="w-3 h-3 text-cyber-blue" /> Kimlik_Bilgisi
                          </label>
                          <input 
                            type="text" 
                            placeholder="ADINIZ SOYADINIZ..."
                            className="w-full bg-transparent border-b border-white/10 py-4 text-white font-mono text-sm focus:outline-none focus:border-cyber-blue transition-all"
                          />
                       </div>
                       <div className="space-y-4 group">
                          <label className="flex items-center gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                             <Mail className="w-3 h-3 text-cyber-blue" /> Dijital_Adres
                          </label>
                          <input 
                            type="email" 
                            placeholder="E-POSTA ADRESİNİZ..."
                            className="w-full bg-transparent border-b border-white/10 py-4 text-white font-mono text-sm focus:outline-none focus:border-cyber-blue transition-all"
                          />
                       </div>
                    </div>
                    <div className="space-y-4 group">
                       <label className="flex items-center gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                          <MessageSquare className="w-3 h-3 text-cyber-blue" /> Proje_Veri_Seti
                       </label>
                       <textarea 
                         value={msg}
                         onChange={(e) => setMsg(e.target.value)}
                         placeholder="TALEBİNİZİ VEYA PROJE DETAYLARINI BURAYA YAZINIZ..."
                         className="w-full bg-transparent border-b border-white/10 py-4 text-white font-mono text-sm h-40 resize-none focus:outline-none focus:border-cyber-blue transition-all"
                       />
                    </div>
                 </div>
                 <div className="pt-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-4">
                       <Crosshair className="w-6 h-6 text-cyber-blue animate-spin-slow" />
                       <p className="text-[10px] font-mono text-neutral-500 max-w-xs leading-relaxed uppercase tracking-widest">
                          TÜM VERİLER AES-256 SİBER-PROTOKOLÜ İLE ŞİFRELENEREK MERKEZİ ÜSSE İLETİLİR.
                       </p>
                    </div>
                    <motion.button 
                      onClick={handleSend}
                      disabled={isSending || !msg}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "px-16 py-6 rounded-[2rem] font-syncopate font-bold text-xs uppercase tracking-widest transition-all shadow-[0_20px_50px_rgba(0,0,243,0.1)] flex items-center gap-4",
                        isSending ? "bg-neutral-800 text-neutral-500" : "bg-white text-black hover:bg-cyber-blue"
                      )}
                    >
                       {isSending ? "İLETİLİYOR..." : "SİNYALİ GÖNDER"}
                       <Send className={cn("w-4 h-4", isSending && "animate-pulse")} />
                    </motion.button>
                 </div>
              </div>
           </div>
        </div>
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </main>
  );
}
