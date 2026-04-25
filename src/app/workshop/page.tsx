"use client";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { create } from "zustand";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { Settings, Cpu, Droplets, Activity, Share2, ShieldCheck, Crosshair, Zap, Layers, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const FlowField = dynamic(() => import("@/components/visuals/FlowField"), { ssr: false });
const NeuralMap = dynamic(() => import("@/components/visuals/NeuralMap"), { ssr: false });
interface WorkshopState {
  progress: number;
  activeSection: number;
  setProgress: (p: number) => void;
  setActiveSection: (s: number) => void;
}
const useWorkshopStore = create<WorkshopState>((set) => ({
  progress: 0,
  activeSection: 0,
  setProgress: (p) => set({ progress: p }),
  setActiveSection: (s) => set({ activeSection: s }),
}));
const CinematicObject = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const { progress, activeSection } = useWorkshopStore();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.5 + progress * 5;
    mesh.current.rotation.z = Math.sin(t) * 0.2;
    mesh.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1 + (activeSection === 2 ? 0.2 : 0));
  });
  return (
    <group>
      <mesh ref={mesh}>
        {activeSection === 0 && <cylinderGeometry args={[1, 1, 4, 32]} />}
        {activeSection === 1 && <torusKnotGeometry args={[1, 0.3, 64, 16]} />}
        {activeSection === 2 && <boxGeometry args={[2, 2, 2, 4, 4, 4]} />}
        {activeSection === 3 && <sphereGeometry args={[1.5, 32, 32]} />}
        <meshStandardMaterial 
          color={activeSection === 2 ? "#ff7300" : "#00f3ff"} 
          metalness={0.5}
          roughness={0.5}
          emissive={activeSection === 2 ? "#ff7300" : "#00f3ff"}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};
export default function WorkshopPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection, setProgress, activeSection } = useWorkshopStore();
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    gsap.registerPlugin(ScrollTrigger);
    const sections = gsap.utils.toArray(".workshop-section");
    sections.forEach((section: any, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
        onUpdate: (self) => {
          if (i === activeSection) setProgress(self.progress);
        }
      });
    });
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [activeSection, setActiveSection, setProgress]);
  const steps = [
    { title: "AKIŞ ANALİZİ", icon: Droplets, desc: "Sıvı dinamiğinin siber-mekanik simülasyonu. Musluktan şebekeye kadar olan yolculuğun siber-fiziksel iz düşümü." },
    { title: "MOLEKÜLER SENTEZ", icon: Layers, desc: "Nano-kaplama ve atomik düzeyde yüzey koruması. P5.js tabanlı moleküler akış alanları ile optimize edilmiş doku." },
    { title: "STRES MATRİSİ", icon: Activity, desc: "80 Bar+ basınç altında malzeme yorulma testi. Shader tabanlı distorsiyon analizi ile kritik eşik kontrolü." },
    { title: "NÖRAL SENKRON", icon: Share2, desc: "MAZ çekirdeği ile tam otonom entegrasyon. React Flow mimarisi üzerinden merkezi sinir ağı yönetimi." },
  ];
  return (
    <main ref={containerRef} className="bg-black text-white overflow-x-hidden selection:bg-cyber-blue selection:text-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-cyber-blue/10" />
        <FlowField />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      </div>
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" /> 
        <Canvas gl={{ antialias: false }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00f3ff" />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
             <CinematicObject />
          </Float>
        </Canvas>
      </div>
      <div className="relative z-30">
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-center gap-3">
                 <Settings className="w-5 h-5 text-cyber-blue animate-spin-slow" />
                 <span className="text-xs font-mono text-cyber-blue tracking-[0.5em] uppercase drop-shadow-lg">Madya Forge v2.5</span>
              </div>
              <h1 className="text-5xl md:text-[11rem] font-bold font-syncopate tracking-tighter leading-none text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                 SİBER <br /> <span className="text-outline text-transparent opacity-50">FORGE</span>
              </h1>
              <p className="text-neutral-300 font-mono text-[10px] md:text-sm max-w-xl mx-auto uppercase tracking-widest leading-relaxed drop-shadow-md">
                 GSAP, R3F ve P5.js ile optimize edilmiş akışkan mühendislik deneyimi.
              </p>
           </motion.div>
           <motion.div 
             animate={{ y: [0, 10, 0] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
           >
              <span className="text-[8px] font-mono text-neutral-600 uppercase tracking-widest">Aşağı Kaydırın</span>
              <div className="w-px h-12 bg-gradient-to-b from-cyber-blue to-transparent" />
           </motion.div>
        </section>
        {steps.map((step, i) => (
          <section key={i} className="workshop-section min-h-screen flex items-center px-6 md:px-20 lg:px-40 py-20 md:py-40">
             <div className={cn(
               "max-w-2xl space-y-8 glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 bg-black/60 backdrop-blur-3xl transition-all duration-1000 ease-out",
               activeSection === i ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-40 scale-90"
             )}>
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 rounded-3xl bg-cyber-blue/10 flex items-center justify-center border border-cyber-blue/20">
                      <step.icon className="w-10 h-10 text-cyber-blue" />
                   </div>
                   <div>
                      <span className="text-[10px] font-mono text-cyber-blue tracking-[0.5em] uppercase">Aşama 0{i+1}</span>
                      <h2 className="text-4xl md:text-6xl font-bold font-syncopate text-white uppercase tracking-tighter">{step.title}</h2>
                   </div>
                </div>
                <p className="text-neutral-400 font-mono text-sm md:text-lg leading-relaxed">
                   {step.desc}
                </p>
                {activeSection === 3 && <NeuralMap />}
                <div className="grid grid-cols-2 gap-6 pt-10 border-t border-white/5">
                   <div className="space-y-1">
                      <span className="block text-[8px] text-neutral-600 uppercase font-mono tracking-widest">Hata Payı</span>
                      <span className="text-xl font-bold text-white font-syncopate">0.001mm</span>
                   </div>
                   <div className="space-y-1">
                      <span className="block text-[8px] text-neutral-600 uppercase font-mono tracking-widest">Analiz Hızı</span>
                      <span className="text-xl font-bold text-cyber-blue font-syncopate">2.4ms</span>
                   </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-12 px-8 py-4 bg-white text-black font-bold text-xs rounded-2xl flex items-center gap-4 uppercase tracking-widest"
                >
                   Teknik Veri Setini Gör <ArrowRight className="w-4 h-4" />
                </motion.button>
             </div>
          </section>
        ))}
        <section className="min-h-screen flex items-center justify-center px-6">
           <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: "Siber-Garanti", val: "10 YIL", icon: ShieldCheck },
                { label: "Aktif Düğüm", val: "1.2K", icon: Cpu },
                { label: "Müdahale Hızı", val: "2.4ms", icon: Zap }
              ].map((item, i) => (
                <div key={i} className="p-12 glass border border-white/5 rounded-[3rem] text-center space-y-6 hover:border-cyber-blue/30 transition-all group">
                   <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-10 h-10 text-cyber-blue" />
                   </div>
                   <div className="space-y-2">
                      <span className="block text-[10px] font-mono text-neutral-600 uppercase tracking-[0.3em]">{item.label}</span>
                      <span className="text-4xl font-bold font-syncopate text-white">{item.val}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </main>
  );
}
