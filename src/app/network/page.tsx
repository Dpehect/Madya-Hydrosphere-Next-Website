"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Radio, Target, Activity, Map as MapIcon, ChevronRight, Share2, Layers, Box } from "lucide-react";
import { cn } from "@/lib/utils";
const regions = [
  { id: "ist", name: "İSTANBUL", x: 15, y: 32, load: "%94", nodes: 42 },
  { id: "ank", name: "ANKARA", x: 42, y: 44, load: "%82", nodes: 28 },
  { id: "izm", name: "İZMİR", x: 10, y: 55, load: "%78", nodes: 21 },
  { id: "ant", name: "ANTALYA", x: 28, y: 78, load: "%65", nodes: 15 },
  { id: "tra", name: "TRABZON", x: 78, y: 28, load: "%45", nodes: 12 },
  { id: "ada", name: "ADANA", x: 55, y: 75, load: "%88", nodes: 18 },
  { id: "bur", name: "BURSA", x: 18, y: 40, load: "%72", nodes: 14 },
  { id: "gaz", name: "GAZİANTEP", x: 70, y: 78, load: "%68", nodes: 11 },
  { id: "kon", name: "KONYA", x: 40, y: 65, load: "%54", nodes: 9 },
  { id: "kay", name: "KAYSERİ", x: 55, y: 52, load: "%48", nodes: 8 },
  { id: "diy", name: "DİYARBAKIR", x: 85, y: 68, load: "%42", nodes: 7 },
  { id: "esk", name: "ESKİŞEHİR", x: 30, y: 48, load: "%62", nodes: 10 },
  { id: "sam", name: "SAMSUN", x: 62, y: 25, load: "%51", nodes: 6 },
  { id: "den", name: "DENİZLİ", x: 15, y: 65, load: "%38", nodes: 5 },
  { id: "mer", name: "MERSİN", x: 48, y: 82, load: "%59", nodes: 10 },
];
export default function NetworkPage() {
  const [active, setActive] = useState(regions[0]);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (reg: typeof regions[0]) => {
    setActive(reg);
    if (window.innerWidth < 1024) {
      setShowModal(true);
    }
  };
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-10 lg:px-20 overflow-hidden relative selection:bg-cyber-blue selection:text-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00f3ff05,transparent_70%)] pointer-events-none" />
      <div className="container mx-auto max-w-[1700px] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
           <div className="lg:col-span-3 space-y-12">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyber-blue animate-ping" />
                    <span className="text-[10px] font-mono text-cyber-blue tracking-[0.5em] uppercase px-4 py-1 border border-cyber-blue/20 rounded-full bg-cyber-blue/5">Ağ Operasyonları</span>
                 </div>
                 <h1 className="text-5xl md:text-6xl font-bold font-syncopate text-white uppercase tracking-tighter leading-none">
                    MİLLİ <br />
                    <span className="text-cyber-blue">MATRİS</span>
                 </h1>
              </div>
               <div className="glass border border-white/5 p-6 md:p-8 rounded-[2.5rem] bg-black/40 space-y-4">
                  <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-widest block mb-4">Bölge Seçimi</span>
                  <div className="space-y-2 max-h-[300px] lg:max-h-none overflow-y-auto no-scrollbar pr-2">
                     {regions.map((reg) => (
                       <button 
                         key={reg.id} 
                         onClick={() => handleSelect(reg)}
                         className={cn(
                           "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                           active.id === reg.id ? "bg-cyber-blue text-black font-bold scale-[1.05]" : "hover:bg-white/5 text-neutral-500"
                         )}
                       >
                          <span className="text-[10px] font-mono tracking-widest">{reg.name}</span>
                          <ChevronRight className={cn("w-4 h-4", active.id === reg.id ? "rotate-90" : "group-hover:translate-x-1")} />
                       </button>
                     ))}
                  </div>
               </div>
              <div className="grid grid-cols-1 gap-4">
                 <div className="p-6 glass border border-white/5 rounded-3xl flex items-center gap-6">
                    <Layers className="w-5 h-5 text-cyber-blue" />
                    <div>
                       <span className="block text-[8px] text-neutral-600 uppercase font-mono">Düğümler</span>
                       <span className="text-2xl font-bold text-white font-mono tracking-tighter">81 AKTİF</span>
                    </div>
                 </div>
              </div>
           </div>
           <div className="lg:col-span-6 relative h-[500px] lg:h-[700px] flex items-center justify-center">
              <div className="absolute inset-0 bg-cyber-blue/5 blur-[120px] rounded-full" />
              <div className="relative w-full h-full perspective-[2000px]">
                 <motion.div 
                   initial={{ rotateX: 45, rotateZ: -10, opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1.5 }}
                   className="w-full h-full relative"
                 >
                    <div className="absolute inset-0 border border-white/5 rounded-[4rem] bg-black/40 overflow-hidden">
                       <div className="absolute inset-0" 
                            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                       <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                          {regions.map((reg) => (
                             <motion.line 
                                key={reg.id}
                                x1="50%" y1="50%"
                                x2={`${reg.x}%`} y2={`${reg.y}%`}
                                stroke="rgba(0, 243, 255, 0.2)"
                                strokeWidth="0.5"
                                strokeDasharray="4 4"
                             />
                          ))}
                       </svg>
                       {regions.map((reg, i) => (
                          <motion.div
                            key={reg.id}
                            className="absolute z-20 cursor-pointer"
                             style={{ left: `${reg.x}%`, top: `${reg.y}%` }}
                             onClick={() => handleSelect(reg)}
                          >
                             <motion.div 
                               animate={{ height: [30, 80, 30], opacity: [0.1, 0.4, 0.1] }}
                               transition={{ duration: 2 + i, repeat: Infinity }}
                               className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-t from-cyber-blue to-transparent" 
                             />
                             <div className={cn(
                               "relative w-4 h-4 rounded-full border-2 border-black transition-all",
                               active.id === reg.id ? "bg-cyber-blue scale-150 shadow-[0_0_20px_#00f3ff]" : "bg-neutral-800"
                             )} />
                             <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                                {reg.name}
                             </div>
                          </motion.div>
                       ))}
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-30">
                       <div className="w-full h-full bg-cyber-blue/20 rounded-full blur-3xl animate-pulse" />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Box className="w-12 h-12 text-cyber-blue animate-spin-slow" />
                       </div>
                    </div>
                 </motion.div>
              </div>
           </div>
           <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                 <motion.div 
                   key={active.id}
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -50 }}
                   className="glass border border-white/10 p-10 rounded-[3rem] bg-gradient-to-br from-cyber-blue/10 to-transparent h-full flex flex-col justify-between"
                 >
                    <div className="space-y-10">
                       <div className="space-y-4">
                          <div className="w-16 h-16 rounded-3xl bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20">
                             <MapIcon className="w-8 h-8 text-cyber-blue" />
                          </div>
                          <div>
                             <h3 className="text-4xl font-bold font-syncopate text-white uppercase">{active.name}</h3>
                             <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-[0.4em]">KOMUTA MERKEZİ</p>
                          </div>
                       </div>
                       <div className="space-y-6">
                          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                             <span className="block text-[8px] font-mono text-neutral-500 uppercase mb-2">Saha Trafiği</span>
                             <span className="text-3xl font-bold text-white font-mono">{active.load}</span>
                          </div>
                          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                             <span className="block text-[8px] font-mono text-neutral-500 uppercase mb-2">Aktif Ekip</span>
                             <span className="text-3xl font-bold text-white font-mono">{active.nodes}</span>
                          </div>
                       </div>
                    </div>
                    <button className="w-full py-5 bg-cyber-blue text-black font-bold text-xs rounded-2xl hover:bg-white transition-all uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,243,255,0.2)]">
                       ANALİZ RAPORU
                    </button>
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
        <div className="mt-10 md:mt-20 flex flex-col sm:flex-row justify-between items-center gap-8 glass border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] bg-black/60">
           <div className="flex gap-12 font-mono">
              <div>
                 <span className="block text-[8px] text-neutral-500 uppercase">Gecikme</span>
                 <span className="text-sm text-white">12 MS</span>
              </div>
              <div>
                 <span className="block text-[8px] text-neutral-500 uppercase">Protokol</span>
                 <span className="text-sm text-cyber-blue">MAZ-SYNC</span>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <Activity className="w-5 h-5 text-cyber-blue animate-pulse" />
              <div className="h-8 w-px bg-white/10" />
              <span className="text-[10px] text-white font-mono uppercase tracking-widest">SİSTEM ÇEKİRDEĞİ AKTİF</span>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[400] lg:hidden"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[401] glass border-t border-cyber-blue/30 rounded-t-[3rem] p-8 lg:hidden bg-black/90 backdrop-blur-3xl shadow-[0_-20px_50px_rgba(0,243,255,0.15)]"
            >
               <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
               <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20">
                           <MapIcon className="w-6 h-6 text-cyber-blue" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-bold font-syncopate text-white uppercase">{active.name}</h3>
                           <p className="text-[8px] text-neutral-500 font-mono uppercase tracking-[0.4em]">KOMUTA MERKEZİ</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => setShowModal(false)}
                       className="p-3 bg-white/5 rounded-full border border-white/10"
                     >
                        <ChevronRight className="w-5 h-5 text-white rotate-90" />
                     </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                        <span className="block text-[7px] font-mono text-neutral-500 uppercase mb-2">Saha Trafiği</span>
                        <span className="text-xl font-bold text-white font-mono">{active.load}</span>
                     </div>
                     <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                        <span className="block text-[7px] font-mono text-neutral-500 uppercase mb-2">Aktif Ekip</span>
                        <span className="text-xl font-bold text-white font-mono">{active.nodes}</span>
                     </div>
                  </div>

                  <div className="p-6 bg-cyber-blue/5 border border-cyber-blue/20 rounded-2xl flex items-center gap-4">
                     <Activity className="w-5 h-5 text-cyber-blue animate-pulse" />
                     <p className="text-[9px] font-mono text-neutral-400 uppercase leading-relaxed">
                        BÖLGE SINYALİ STABIL. VERI PAKETLERI MAZ-SYNC PROTOKOLÜ ILE AKTARILIYOR.
                     </p>
                  </div>

                  <button className="w-full py-5 bg-cyber-blue text-black font-bold text-[10px] rounded-2xl uppercase tracking-[0.3em]">
                     DETAYLI ANALİZ RAPORU
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
