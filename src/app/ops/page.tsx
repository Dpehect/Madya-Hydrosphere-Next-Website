"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Shield, Cpu, Zap, Droplets, HardDrive, Terminal, Server, Globe, ArrowUpRight, BarChart3, AlertTriangle, Layers, Radio, Crosshair } from "lucide-react";
import { cn } from "@/lib/utils";
const dataStream = [
  { label: "AKIŞ HIZI", value: "1.4m/s", trend: "+2%" },
  { label: "SİSTEM YÜKÜ", value: "%84", trend: "-1%" },
  { label: "VERİ PAKETİ", value: "204kb", trend: "0%" },
];
export default function OperationsPage() {
  const [activeSector, setActiveSector] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const messages = [
      "Sinyal güçlendirildi: Bölge 4",
      "Basınç dengeleme algoritması aktif.",
      "Yeni servis talebi: İstanbul / Beşiktaş",
      "Nöral ağ senkronize edildi.",
      "Kritik eşik aşıldı: Hat 12 (Düzeltildi)",
    ];
    const interval = setInterval(() => {
      setLogs(prev => [messages[Math.floor(Math.random() * messages.length)], ...prev].slice(0, 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,243,255,0.02)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
      <div className="container mx-auto max-w-[1400px] relative z-20">
        <div className="flex flex-col lg:flex-row gap-6 mb-10 items-start">
           <div className="w-full glass border border-cyber-blue/20 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-cyber-blue/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                 <span className="text-[9px] md:text-[10px] font-mono text-cyber-blue tracking-[0.5em] uppercase">OPERASYONEL DURUM</span>
                 <h2 className="text-3xl md:text-4xl font-bold font-syncopate text-white uppercase tracking-tighter">SİSTEM <span className="text-cyber-blue underline underline-offset-8">NOMİNAL</span></h2>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-10">
                 {dataStream.map((item, i) => (
                   <div key={i} className="text-center md:text-right">
                      <span className="block text-[7px] md:text-[8px] font-mono text-neutral-500 uppercase">{item.label}</span>
                      <span className="text-base md:text-xl font-bold text-white font-mono">{item.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <div className="space-y-6">
              <div className="p-6 glass border border-white/5 rounded-3xl space-y-6">
                 <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyber-purple" />
                    <span className="text-[10px] font-mono text-white tracking-widest uppercase">Şebeke Katmanları</span>
                 </div>
                 <div className="space-y-3">
                    {["Fiziksel Borulama", "Sensör Ağı", "Veri İletimi", "Yapay Zeka"].map((layer, i) => (
                      <div key={layer} className="flex items-center gap-4 group cursor-pointer">
                         <div className={cn("w-1 h-8 transition-all", i <= 2 ? "bg-cyber-blue" : "bg-white/10")} />
                         <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors">{layer}</span>
                         <div className="ml-auto w-2 h-2 rounded-full bg-cyber-blue/20 group-hover:bg-cyber-blue animate-pulse" />
                      </div>
                    ))}
                 </div>
              </div>
              <div className="p-6 glass border border-white/5 rounded-3xl bg-gradient-to-b from-white/5 to-transparent">
                 <div className="flex items-center gap-2 mb-6">
                    <Radio className="w-4 h-4 text-cyber-green" />
                    <span className="text-[10px] font-mono text-white tracking-widest uppercase">Saha Frekansı</span>
                 </div>
                 <div className="flex items-end gap-1 h-24">
                    {[...Array(15)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        animate={{ height: [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 70}%`] }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="flex-1 bg-cyber-green/30 rounded-t-sm" 
                      />
                    ))}
                 </div>
              </div>
           </div>
           <div className="lg:col-span-2 space-y-6">
              <div className="relative glass border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 h-[400px] md:h-[550px] overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05),transparent_70%)]" />
                 <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                       <div className="flex items-center gap-2">
                          <Crosshair className="w-4 h-4 md:w-5 md:h-5 text-cyber-blue animate-spin-slow" />
                          <span className="text-[8px] md:text-[10px] font-mono text-white uppercase tracking-widest">Merkezi İzleme v12</span>
                       </div>
                       <button className="px-3 py-1.5 md:px-4 md:py-2 border border-white/10 rounded-xl text-[7px] md:text-[8px] font-mono text-neutral-500 hover:text-white transition-all uppercase">Tam Ekran</button>
                    </div>
                    <div className="flex items-center justify-center flex-1">
                       <div className="relative">
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="w-48 h-48 md:w-80 md:h-80 border-2 border-cyber-blue/10 rounded-full border-dashed p-4"
                          >
                             <div className="w-full h-full border border-cyber-blue/20 rounded-full flex items-center justify-center">
                                <div className="w-20 h-20 md:w-32 md:h-32 bg-cyber-blue/5 rounded-full flex items-center justify-center blur-2xl md:blur-3xl" />
                             </div>
                          </motion.div>
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                             <div className="text-[8px] md:text-[10px] font-mono text-cyber-blue mb-1 uppercase tracking-[0.3em] md:tracking-[0.5em]">Veri Nabzı</div>
                             <div className="text-4xl md:text-6xl font-bold font-syncopate text-white">99.9</div>
                             <div className="text-[7px] md:text-[8px] font-mono text-neutral-600 uppercase">Kararlılık</div>
                          </div>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/5">
                          <span className="block text-[7px] md:text-[8px] font-mono text-neutral-500 uppercase mb-2">Kapasite</span>
                          <div className="flex items-center gap-2 md:gap-4">
                             <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-[70%] h-full bg-cyber-blue" />
                             </div>
                             <span className="text-[10px] font-bold text-white font-mono">%70</span>
                          </div>
                       </div>
                       <div className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/5">
                          <span className="block text-[7px] md:text-[8px] font-mono text-neutral-500 uppercase mb-2">Verimlilik</span>
                          <div className="flex items-center gap-2 md:gap-4">
                             <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-[92%] h-full bg-cyber-green" />
                             </div>
                             <span className="text-[10px] font-bold text-white font-mono">%92</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           <div className="space-y-6">
              <div className="p-8 glass border border-white/5 rounded-[2.5rem] bg-black/40 h-full flex flex-col">
                 <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                       <Terminal className="w-4 h-4 text-cyber-blue" />
                       <span className="text-[10px] font-mono text-white uppercase tracking-widest">Akış Logları</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
                 </div>
                 <div className="flex-1 space-y-4 overflow-hidden">
                    <AnimatePresence>
                       {logs.map((log, i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           className="text-[9px] font-mono text-neutral-500 border-l border-cyber-blue/30 pl-3 py-1"
                         >
                            <span className="text-cyber-blue/50 mr-2">[{new Date().toLocaleTimeString('tr-TR', { hour12: false })}]</span>
                            {log}
                          </motion.div>
                       ))}
                    </AnimatePresence>
                 </div>
                 <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4 p-4 bg-cyber-red/10 border border-cyber-red/20 rounded-2xl">
                       <AlertTriangle className="w-5 h-5 text-cyber-red" />
                       <div className="space-y-0.5">
                          <span className="block text-[8px] font-bold text-cyber-red uppercase font-mono tracking-widest">Kritik Bölge</span>
                          <p className="text-[9px] text-neutral-500 font-mono">Bölge 7: Aşırı Basınç Yüklemesi</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
