"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Rocket, Globe, Shield, Cpu, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
const visions = [
  { 
    id: "01", 
    title: "Sürdürülebilir Akış", 
    icon: Zap, 
    desc: "Geleceğin dünyasında su ve enerji kaynaklarının sıfır kayıpla yönetilmesini hedefleyen akıllı altyapılar inşa ediyoruz.",
    color: "from-cyber-blue/20 to-transparent"
  },
  { 
    id: "02", 
    title: "Siber Altyapı", 
    icon: Cpu, 
    desc: "Tesisat sistemlerini sadece boru hatları değil, veri aktaran akıllı sinir ağları olarak yeniden tanımlıyoruz.",
    color: "from-cyber-purple/20 to-transparent"
  },
  { 
    id: "03", 
    title: "Global Erişim", 
    icon: Globe, 
    desc: "Türkiye'den doğan Madya mühendislik standartlarını, dünya çapında bir kalite referansı haline getirmeyi hedefliyoruz.",
    color: "from-cyber-green/20 to-transparent"
  }
];
export default function VisionPage() {
  return (
    <main className="min-h-screen bg-[#030303] pt-24 md:pt-32 pb-20 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyber-blue blur-[80px] md:blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyber-purple blur-[80px] md:blur-[120px] rounded-full animate-pulse delay-700" />
      </div>
      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 space-y-4 md:space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 glass border border-white/10 rounded-full">
             <Eye className="w-4 h-4 text-cyber-blue" />
             <span className="text-[8px] md:text-[10px] font-mono text-white tracking-[0.3em] uppercase">GELECEK PROJEKSİYONU</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl xl:text-8xl font-bold font-syncopate text-white leading-tight tracking-tighter uppercase">VİZYON <br /> <span className="text-cyber-blue">2030</span></h2>
          <p className="text-neutral-500 font-mono text-[9px] md:text-sm lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Sıradan bir tesisat firması olmanın ötesinde, akışkanlar mekaniğinin dijital ve fiziksel sınırlarını zorlayan bir teknoloji öncüsü olma yolunda ilerliyoruz.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
          {visions.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={cn(
                "p-8 md:p-10 glass border border-white/5 rounded-[2rem] md:rounded-[3rem] relative group overflow-hidden transition-all hover:border-white/20 bg-gradient-to-br",
                v.color
              )}
            >
              <div className="absolute top-4 right-6 md:top-6 md:right-8 text-4xl md:text-5xl font-bold font-syncopate text-white opacity-5 group-hover:opacity-10 transition-opacity">{v.id}</div>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                 <v.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 uppercase tracking-tighter">{v.title}</h3>
              <p className="text-neutral-500 font-mono text-[10px] md:text-xs leading-relaxed">
                {v.desc}
              </p>
              <div className="mt-6 md:mt-8 flex items-center gap-2">
                 <div className="h-[1px] w-6 md:w-8 bg-cyber-blue" />
                 <span className="text-[7px] md:text-[8px] font-mono text-cyber-blue uppercase tracking-widest">Stratejik Hedef</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 md:mt-32 p-8 md:p-12 glass border border-white/5 rounded-[2rem] md:rounded-[4rem] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
           <div className="flex-1 space-y-4 md:space-y-6">
              <div className="flex items-center gap-3">
                 <Shield className="w-5 h-5 md:w-6 md:h-6 text-cyber-green" />
                 <h4 className="text-2xl md:text-3xl font-bold font-syncopate text-white uppercase">GÜVENLİK STANDARTI</h4>
              </div>
              <p className="text-neutral-500 font-mono text-[10px] md:text-xs leading-relaxed">
                Madya olarak vizyonumuzun temelinde "Sıfır Hata" prensibi yatar. Geliştirdiğimiz her yeni teknoloji, önce en zorlu laboratuvar testlerinden geçer ve ardından Türkiye'nin her noktasına aynı kaliteyle yayılır.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                 <div className="px-3 py-1.5 md:px-4 md:py-2 bg-cyber-green/10 border border-cyber-green/20 rounded-xl text-cyber-green text-[8px] md:text-[10px] font-mono">ISO 14001</div>
                 <div className="px-3 py-1.5 md:px-4 md:py-2 bg-cyber-blue/10 border border-cyber-blue/20 rounded-xl text-cyber-blue text-[8px] md:text-[10px] font-mono">TSE SİBER-GÜVENLİK</div>
              </div>
           </div>
           <div className="flex-1 relative w-full h-48 md:h-64 bg-black/40 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-cyber-green/30 flex items-center justify-center"
              >
                 <Rocket className="w-12 h-12 md:w-16 md:h-16 text-cyber-green opacity-50" />
                 <div className="absolute inset-0 border-4 border-cyber-green/10 rounded-full animate-ping" />
              </motion.div>
           </div>
        </div>
      </div>
    </main>
  );
}
