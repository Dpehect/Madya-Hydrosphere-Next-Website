"use client";
import React, { useRef, Suspense, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  MeshDistortMaterial, 
  MeshWobbleMaterial,
  Environment,
  ContactShadows,
  Text,
  Stars,
  PresentationControls,
  MeshTransmissionMaterial
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";
import { ArrowRight, Zap, Radio, Terminal, Box, Activity, Droplets, Settings, ShieldCheck, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

// --- SNAPPY UTILITIES: TEXT SCRAMBLE ---
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const TextScramble = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  const scramble = async () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  React.useEffect(() => {
    scramble();
  }, []);

  return (
    <motion.span 
      onMouseEnter={() => {
        if (!isHovered) {
          setIsHovered(true);
          scramble().then(() => setIsHovered(false));
        }
      }}
      className={className}
    >
      {displayText}
    </motion.span>
  );
};

// --- SNAPPY UTILITIES: KINETIC GRID ---
const KineticGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-1 pointer-events-none opacity-20"
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 243, 255, 0.15) 0%, transparent 40%)`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
};

// --- NEW COMPONENT: FLUID SCHEMA (TECHNICAL DIAGRAM) ---
const FluidSchema = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-10">
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_20px_rgba(0,243,255,0.3)]">
        {/* Connection Lines */}
        <motion.path 
          d="M50 150 H350 M150 50 V250 M250 50 V250" 
          stroke="#00f3ff" 
          strokeWidth="0.5" 
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Animated Fluid Paths */}
        {[
          "M50 150 H150", "M150 150 H250", "M250 150 H350",
          "M150 50 V150", "M150 150 V250",
          "M250 50 V150", "M250 150 V250"
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#00f3ff"
            strokeWidth="2"
            strokeDasharray="10 20"
            animate={{ strokeDashoffset: [-60, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
          />
        ))}

        {/* Nodes */}
        {[
          { x: 150, y: 150, label: "HUB-01", icon: <Cpu className="w-4 h-4" /> },
          { x: 50, y: 150, label: "IN-01", icon: <Droplets className="w-4 h-4" /> },
          { x: 350, y: 150, label: "OUT-01", icon: <ShieldCheck className="w-4 h-4" /> },
          { x: 150, y: 50, label: "SNS-A", icon: <Settings className="w-4 h-4" /> },
          { x: 250, y: 250, label: "SNS-B", icon: <Activity className="w-4 h-4" /> }
        ].map((node, i) => (
          <motion.g 
            key={i} 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
          >
            <circle cx={node.x} cy={node.y} r="15" fill="#030303" stroke="#00f3ff" strokeWidth="1" />
            <circle cx={node.x} cy={node.y} r="12" fill="#00f3ff" fillOpacity="0.05" />
            <foreignObject x={node.x - 8} y={node.y - 8} width="16" height="16">
              <div className="text-cyber-blue flex items-center justify-center h-full">
                {React.cloneElement(node.icon as React.ReactElement, { size: 10 })}
              </div>
            </foreignObject>
            <text x={node.x} y={node.y + 25} textAnchor="middle" fill="#00f3ff" className="text-[6px] font-mono tracking-widest uppercase opacity-60">
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Data Readouts */}
        <g className="font-mono text-[5px] uppercase">
          <motion.text 
            x="20" y="30" fill="#00f3ff"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            FLOW: 12.4 L/S
          </motion.text>
          <motion.text 
            x="20" y="45" fill="#00f3ff"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            PRES: 4.2 BAR
          </motion.text>
        </g>
      </svg>
      
      {/* Scanning Line */}
      <motion.div 
        className="absolute inset-x-0 h-px bg-cyber-blue/30 shadow-[0_0_10px_#00f3ff]"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};


// --- HACKATHON CORE: THE NEURAL FLUID NEXUS ---
const QuantumCore = () => {
  const group = useRef<THREE.Group>(null!);
  
  // Simplified Tendrils for performance
  const tendrils = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      r: 2 + Math.random() * 3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.z = t * 0.15; // Increased speed
    group.current.rotation.y = t * 0.08;
    
    // Active pulse
    const s = 1 + Math.sin(t * 2) * 0.05;
    group.current.scale.set(s, s, s);
  });

  return (
    <PresentationControls
       global
       config={{ mass: 2, tension: 500 }}
       snap={{ mass: 4, tension: 1500 }}
       rotation={[0, 0, 0]}
       polar={[-Math.PI / 3, Math.PI / 3]}
       azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
    >
      <group ref={group}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={2}
              thickness={1.5}
              anisotropy={0.1}
              chromaticAberration={0.05}
              distortion={0.5}
              distortionScale={0.3}
              temporalDistortion={0.1}
              color="#00f3ff"
              resolution={256}
            />
          </mesh>
        </Float>

        {/* Neural Tendrils - Optimized */}
        {tendrils.map((ten, i) => (
          <mesh key={i} rotation={[ten.offset, ten.offset, 0]}>
             <torusGeometry args={[ten.r, 0.005, 4, 32]} />
             <meshStandardMaterial 
                color="#00f3ff" 
                emissive="#00f3ff" 
                emissiveIntensity={5} 
                transparent 
                opacity={0.15} 
             />
          </mesh>
        ))}
      </group>
      <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={2} />
    </PresentationControls>
  );
};

// --- INTERACTIVE NAVIGATION HUB ---
const HackathonUI = () => {
  return (
    <div className="relative min-h-screen z-20 pointer-events-none">
      
      {/* Hero Content Section - REBORN AS MINIMAL ART */}
      <div className="h-screen flex flex-col items-center justify-center py-20 px-10">
        
        {/* Technical Watermark */}
        <div className="absolute top-10 left-10 space-y-1 opacity-40">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
              <span className="text-[8px] font-mono text-white uppercase tracking-[0.5em]">Neural_Sync: Online</span>
           </div>
           <p className="text-[6px] font-mono text-neutral-500 uppercase tracking-widest">SoftBridge Solutions ürünüdür</p>
        </div>

        {/* Central Identity - HYPER CREATIVE */}
        <div className="text-center space-y-8 relative group pointer-events-auto">
          <div className="absolute -inset-20 bg-cyber-blue/5 blur-[100px] rounded-full opacity-30" />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Snappier ease
            className="text-7xl md:text-[14rem] font-bold font-syncopate tracking-[0.15em] leading-none text-white drop-shadow-[0_0_80px_rgba(0,243,255,0.4)] relative z-10"
          >
            <TextScramble text="MADYA" />
          </motion.h1>


          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-[10px] md:text-xs font-mono text-cyber-blue uppercase tracking-[1em] drop-shadow-md">
               Akışkan Gerçekliğin Merkezi
            </p>
            <div className="w-px h-24 bg-gradient-to-b from-cyber-blue to-transparent" />
          </motion.div>
        </div>

        {/* Minimal System Metrics */}
        <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-30 font-mono text-[8px] uppercase tracking-widest">
           <span>Lat: 39.9334° N</span>
           <span>Lon: 32.8597° E</span>
           <span className="text-cyber-blue">Active_Flow: 100%</span>
        </div>

        {/* BOTTOM CENTER CREDIT */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40">
           <p className="text-[10px] font-mono text-cyber-blue uppercase tracking-[0.5em] font-bold whitespace-nowrap">
              SoftBridge Solutions
           </p>
        </div>
      </div>

      {/* DETAILED CONTENT SECTIONS */}
      <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border-t border-white/5">
        
        {/* Vizyon Section */}
        <section className="py-40 border-b border-white/5 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2 space-y-10"
              >
                <span className="text-cyber-blue font-mono text-xs tracking-[0.5em] uppercase">01 / Mühendislik Vizyonu</span>
                <h2 className="text-5xl md:text-8xl font-bold font-syncopate text-white leading-none uppercase tracking-tighter">
                  AKIŞKAN <br /> <span className="text-outline text-transparent opacity-30">ZEKA</span>
                </h2>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed uppercase tracking-widest max-w-xl">
                  Geleneksel tesisat kavramını siber-fiziksel sistemlerle yeniden tanımlıyoruz. Madya, suyun yaşam alanlarınızdaki her milimetresini yapay zeka ile yönetir.
                </p>
                <div className="flex gap-10">
                   <div className="space-y-2">
                      <span className="text-3xl font-bold font-syncopate text-white">%99.9</span>
                      <p className="text-[8px] font-mono text-neutral-600 uppercase tracking-widest">Hassasiyet Oranı</p>
                   </div>
                   <div className="space-y-2">
                      <span className="text-3xl font-bold font-syncopate text-white">2.4ms</span>
                      <p className="text-[8px] font-mono text-neutral-600 uppercase tracking-widest">Tepki Süresi</p>
                   </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="lg:w-1/2 w-full aspect-video glass rounded-[4rem] border border-white/10 relative overflow-hidden perspective-1000"
              >
                 <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 to-transparent" />
                 <FluidSchema />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Operasyon Section */}
        <section className="py-40 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-32 space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-cyber-blue font-mono text-[10px] tracking-[0.8em] uppercase"
              >
                Operasyonel Protokol
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-bold font-syncopate text-white uppercase tracking-tighter"
              >
                SİSTEM <span className="text-outline text-transparent opacity-30">AKIŞI</span>
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { step: "01", title: " ANALİZ", desc: "Altyapının dijital ikiz simülasyonu." },
                { step: "02", title: "ENTEGRE", desc: "Nöral kontrol ağının kurulumu." },
                { step: "03", title: "OPTIMİZE", desc: "Otonom debi ve basınç dengeleme." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.02, 
                    rotateX: -2, 
                    rotateY: 2,
                    borderColor: "rgba(0, 243, 255, 0.3)",
                    boxShadow: "0 0 40px rgba(0, 243, 255, 0.1)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30 
                  }}
                  viewport={{ once: true }}
                  className="glass p-12 rounded-[3rem] border border-white/5 space-y-6 group cursor-pointer"
                >
                  <span className="text-5xl font-bold font-syncopate text-white/10 group-hover:text-cyber-blue/20 transition-colors">{item.step}</span>
                  <h4 className="text-xl font-bold font-syncopate text-white">{item.title}</h4>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer with Credit */}
        <footer className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="space-y-2">
                <h3 className="font-syncopate font-bold text-2xl text-white">MADYA</h3>
                <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">© 2026 Tüm Hakları Saklıdır.</p>
             </div>
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="px-8 py-4 glass border border-cyber-blue/20 rounded-full"
             >
                <p className="text-[10px] font-mono text-cyber-blue uppercase tracking-[0.3em] font-bold">
                   SoftBridge Solutions ürünüdür
                </p>
             </motion.div>
          </div>
        </footer>
      </div>

      {/* Cinematic Overlays */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-black relative">
      
      {/* 3D WebGL Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <QuantumCore />
            <Environment preset="night" />
          </Suspense>
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />
        </Canvas>
      </div>

      {/* Hackathon Interface Layer */}
      <HackathonUI />

      {/* Kinetic Grid Background */}
      <KineticGrid />


      {/* Grain & Noise Overlay */}
      <div className="fixed inset-0 z-30 pointer-events-none opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Scanline Effect */}
      <div className="fixed inset-0 z-30 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
    </main>
  );
}
