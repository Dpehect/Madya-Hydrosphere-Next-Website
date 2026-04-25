"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, Thermometer, ShieldCheck, QrCode, X, Activity, FlaskConical, Beaker, Dna, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

const testModules = [
  { id: "MT-01", title: "Moleküler Analiz", icon: Dna, status: "Optimal", color: "text-cyber-blue" },
  { id: "BT-24", title: "Basınç Toleransı", icon: Gauge, status: "Yüksek", color: "text-cyber-purple" },
  { id: "KA-09", title: "Kimyasal Kararlılık", icon: FlaskConical, status: "Stabil", color: "text-cyber-green" },
  { id: "IT-12", title: "Isıl Spektrum", icon: Thermometer, status: "Normal", color: "text-cyber-red" },
];

export default function LabPage() {
  const [showScan, setShowScan] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-20 overflow-hidden relative">
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Control Panel */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-6 glass border border-white/5 rounded-3xl space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 flex items-center justify-center">
                    <Microscope className="w-5 h-5 text-cyber-blue" />
                 </div>
                 <div>
                    <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-widest">Merkez Durumu</span>
                    <span className="text-xs font-bold text-white uppercase">AR GE AKTİF</span>
                 </div>
              </div>

              <div className="space-y-4">
                 {testModules.map((module, i) => (
                   <div key={module.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <module.icon className={cn("w-4 h-4", module.color)} />
                         <span className="text-[10px] font-mono text-neutral-400">{module.title}</span>
                      </div>
                      <span className="text-[8px] font-bold text-white px-2 py-0.5 bg-black rounded">{module.status}</span>
                   </div>
                 ))}
              </div>

              <button 
                onClick={() => setShowScan(true)}
                className="w-full py-4 bg-cyber-blue text-black font-bold text-[10px] rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,243,255,0.2)]"
              >
                <QrCode className="w-4 h-4" /> SİSTEMİ QR İLE OKUT
              </button>
            </motion.div>

            <div className="p-6 glass border border-white/5 rounded-3xl">
               <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-cyber-green animate-pulse" />
                  <span className="text-[10px] font-mono text-white tracking-widest uppercase">Canlı Veri Akışı</span>
               </div>
               <div className="h-20 w-full flex items-end gap-1 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [`${20 + Math.random() * 60}%`, `${30 + Math.random() * 70}%`] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      className="flex-1 bg-cyber-green/20 rounded-t-[2px]" 
                    />
                  ))}
               </div>
            </div>
          </div>

          {/* Center Analysis Area */}
          <div className="lg:col-span-6 space-y-8 lg:space-y-10">
            <header className="text-center space-y-4">
               <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold font-syncopate text-white uppercase tracking-tighter leading-tight md:leading-none">
                 AR GE <br /> <span className="text-cyber-blue">LABORATUVARI</span>
               </h2>
               <p className="text-neutral-500 font-mono text-[10px] md:text-xs lg:text-sm max-w-xl mx-auto leading-relaxed">
                 Madya'nın fütüristik test merkezi; her bir akışkan bileşenini atomik düzeyde analiz ederek siber-tesisatın geleceğini inşa ediyor.
               </p>
            </header>

            <div className="relative aspect-[16/10] md:aspect-video glass border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00f3ff05,transparent_70%)]" />
               <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-blue animate-ping" />
                  <span className="text-[7px] md:text-[8px] font-mono text-neutral-500 uppercase tracking-widest">Analiz Paneli v2.0</span>
               </div>
               
               {/* Animated Holographic Core */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center"
               >
                  <div className="absolute inset-0 border border-cyber-blue/10 rounded-full" />
                  <div className="absolute inset-4 border border-cyber-blue/20 rounded-full border-dashed" />
                  <Beaker className="w-12 h-12 md:w-20 md:h-20 text-cyber-blue opacity-50" />
               </motion.div>

               <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-right">
                  <span className="block text-[7px] md:text-[8px] font-mono text-neutral-600 uppercase">AKIŞ KARARLILIĞI</span>
                  <span className="text-xl md:text-2xl font-bold font-syncopate text-white">%99.98</span>
               </div>
            </div>
          </div>

          {/* Right Metrics Panel */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-8 glass border border-white/5 rounded-[2.5rem] space-y-8">
               <h3 className="text-xs font-bold font-syncopate text-white border-b border-white/10 pb-4 uppercase">Test Parametreleri</h3>
               <div className="space-y-8">
                  {[
                    { label: "Viskozite", val: "1.02", unit: "cP" },
                    { label: "Basınç", val: "4.8", unit: "BAR" },
                    { label: "Sıcaklık", val: "18.4", unit: "°C" },
                  ].map((m) => (
                    <div key={m.label} className="space-y-2">
                       <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase">{m.label}</span>
                          <span className="text-xs font-bold text-white">{m.val} {m.unit}</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} className="h-full bg-cyber-blue" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-8 glass border border-white/5 rounded-[2.5rem] bg-gradient-to-br from-cyber-blue/5 to-transparent">
               <span className="text-[10px] font-mono text-cyber-blue uppercase tracking-widest block mb-4">Sistem Onayı</span>
               <div className="flex items-center gap-4">
                  <ShieldCheck className="w-10 h-10 text-cyber-blue" />
                  <p className="text-[9px] font-mono text-neutral-500 leading-relaxed uppercase">Tüm güvenlik protokolleri başarıyla doğrulandı.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Scan Overlay */}
      <AnimatePresence>
        {showScan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6">
            <button onClick={() => setShowScan(false)} className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"><X className="w-10 h-10" /></button>
            <div className="relative w-full max-w-sm aspect-square glass border border-cyber-blue/20 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center p-12">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#00f3ff05,transparent_70%)]" />
               <QrCode className="w-48 h-48 text-cyber-blue opacity-50 mb-8" />
               <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-1 bg-cyber-blue shadow-[0_0_20px_#00f3ff] z-10" />
               <span className="text-[10px] font-mono text-cyber-blue animate-pulse uppercase tracking-[0.5em]">Tesisat Analiz Ediliyor...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
