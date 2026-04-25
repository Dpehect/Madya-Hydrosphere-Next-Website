"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, Stars, ContactShadows, Torus, Sparkles } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Settings, Zap, Droplets, ShieldCheck, Activity } from "lucide-react";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const milestones = [
  { year: "1986", title: "KURULUŞ", desc: "Tesisat mühendisliğinin temelleri." },
  { year: "1998", title: "DİJİTALLEŞME", desc: "İlk bilgisayar destekli ölçüm sistemleri." },
  { year: "2010", title: "MİLLİ AĞ", desc: "81 ilde aktif servis altyapısı." },
  { year: "2022", title: "YAPAY ZEKA", desc: "Otonom basınç kontrol teknolojisi." },
  { year: "2026", title: "SİBER AKIŞ", desc: "Yeni nesil akışkan ekosistemi." },
];
function CyberValve({ speed, distort, color }: { speed: number; distort: number; color: string }) {
  const meshRef = useRef<any>(null);
  const ringRef = useRef<any>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
      ringRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={color}
            speed={speed}
            distort={distort}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
      <Torus ref={ringRef} args={[1.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </Torus>
      <Sparkles count={50} scale={3} size={2} speed={speed * 0.5} color={color} />
    </group>
  );
}
export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [systemMode, setSystemMode] = useState<"STABİL" | "OPTİMİZASYON" | "KRİTİK">("STABİL");
  const getSystemColor = () => {
    if (systemMode === "STABİL") return "#00f3ff";
    if (systemMode === "OPTİMİZASYON") return "#bc13fe";
    return "#ff003c";
  };
  const handleInteraction = () => {
    if (Math.random() > 0.8) {
      setActiveYearIndex((prev) => (prev + 1) % milestones.length);
    }
  };
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".milestone-item");
      items.forEach((item: any) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          filter: "blur(10px)",
          duration: 1,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <main ref={containerRef} className="bg-black overflow-x-hidden">
      <section className="h-screen w-full relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#0a1128,black)]">
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute top-24 left-0 w-full px-10 flex justify-between items-start pointer-events-auto">
             <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <Settings className="w-4 h-4 text-cyber-blue animate-spin-slow" />
                   <span className="text-[10px] font-mono text-white tracking-[0.3em] uppercase">AKILLI AKIŞ KONTROL ÜNİTESİ v4.2</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-syncopate text-white uppercase tracking-tighter">SİSTEM <br /> <span style={{ color: getSystemColor() }}>{systemMode}</span></h2>
             </div>
             <div className="flex gap-4">
                {["STABİL", "OPTİMİZASYON", "KRİTİK"].map((mode) => (
                  <button 
                    key={mode}
                    onClick={() => setSystemMode(mode as any)}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-[8px] font-mono transition-all",
                      systemMode === mode 
                        ? "bg-white text-black border-white" 
                        : "border-white/10 text-white/40 hover:border-white/30"
                    )}
                  >
                    {mode}
                  </button>
                ))}
             </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-10 space-y-8 pointer-events-auto">
             <div className="space-y-1">
                <span className="text-[8px] font-mono text-neutral-600 uppercase">AKIŞ BASINCI</span>
                <div className="text-2xl font-bold font-syncopate text-white">{systemMode === "KRİTİK" ? "12.8" : "4.2"} <span className="text-[10px] text-neutral-600">BAR</span></div>
             </div>
             <div className="space-y-1">
                <span className="text-[8px] font-mono text-neutral-600 uppercase">VİSKOZİTE</span>
                <div className="text-2xl font-bold font-syncopate text-white">0.89 <span className="text-[10px] text-neutral-600">mPa.s</span></div>
             </div>
             <div className="space-y-1">
                <span className="text-[8px] font-mono text-neutral-600 uppercase">ENERJİ GERİ KAZANIMI</span>
                <div className="text-2xl font-bold font-syncopate text-cyber-green">%{systemMode === "OPTİMİZASYON" ? "94" : "82"}</div>
             </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-10 space-y-4 pointer-events-auto text-right">
             <div className="p-4 glass border border-white/5 rounded-2xl space-y-4 max-w-[200px]">
                <Activity className="w-5 h-5 text-cyber-blue ml-auto" />
                <p className="text-[9px] font-mono text-neutral-500 leading-relaxed uppercase">
                  {milestones[activeYearIndex].year} Yılındaki teknolojik altyapı simüle ediliyor...
                </p>
                <div className="text-xs font-bold text-white uppercase tracking-widest">{milestones[activeYearIndex].title}</div>
             </div>
          </div>
          <div className="absolute bottom-10 left-10 p-6 glass border border-white/5 rounded-2xl flex items-center gap-6 pointer-events-auto">
             <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyber-blue" />
                <span className="text-[10px] font-mono text-white">AKTİF MODÜL: {activeYearIndex + 1}/5</span>
             </div>
             <div className="h-4 w-[1px] bg-white/10" />
             <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyber-blue" />
                <span className="text-[10px] font-mono text-white uppercase">SIVI SİMÜLASYONU AKTİF</span>
             </div>
          </div>
        </div>
        <Canvas className="w-full h-full cursor-crosshair">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls 
            enableZoom={false} 
            makeDefault 
            onChange={handleInteraction}
          />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={getSystemColor()} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color={getSystemColor()} />
          <Suspense fallback={null}>
            <CyberValve 
              speed={systemMode === "KRİTİK" ? 10 : systemMode === "OPTİMİZASYON" ? 5 : 2} 
              distort={systemMode === "KRİTİK" ? 0.8 : 0.4} 
              color={getSystemColor()} 
            />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
          </Suspense>
        </Canvas>
        <div className="absolute bottom-10 right-1/2 translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
           <span className="text-[8px] font-mono text-white uppercase tracking-[0.3em]">Miras Geçmişi</span>
           <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>
      <section className="py-40 bg-black relative">
        <div className="container px-6">
          <header className="mb-32 text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass border border-white/10 rounded-full">
               <ShieldCheck className="w-4 h-4 text-cyber-blue" />
               <span className="text-[10px] font-mono text-white tracking-widest uppercase">Güvenilirlik Tarihçesi</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold font-syncopate tracking-tight text-white mb-6 uppercase">Mühendislik Mirası</h2>
            <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">40 Yıldır her damlada aynı hassasiyet.</p>
          </header>
          <div className="relative border-l border-white/10 ml-4 md:ml-0 md:flex md:flex-col md:items-center">
            {milestones.map((milestone, i) => (
              <div key={i} className="milestone-item relative mb-32 md:w-full max-w-4xl flex items-center">
                <div className="absolute -left-[5px] md:left-1/2 md:-translate-x-1/2 w-2 h-2 rounded-full bg-cyber-blue shadow-[0_0_10px_#00f3ff]" />
                <div className={cn("pl-10 md:pl-0 md:w-1/2", i % 2 === 0 ? "md:pr-20 md:text-right" : "md:ml-auto md:pl-20 md:text-left")}>
                  <span className="text-4xl font-bold font-syncopate text-cyber-blue opacity-50 mb-2 block">{milestone.year}</span>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter uppercase">{milestone.title}</h3>
                  <p className="text-neutral-500 font-mono text-xs leading-relaxed">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
