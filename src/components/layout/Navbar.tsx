"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/useThemeStore";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
const navItems = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Deneyim", path: "/experience" },
  { name: "Operasyon", path: "/ops" },
  { name: "Laboratuvar", path: "/lab" },
  { name: "Ağımız", path: "/network" },
  { name: "Vizyon", path: "/vision" },
  { name: "Atölye", path: "/workshop" },
  { name: "İletişim", path: "/interface" },
];
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[300] flex items-center justify-between px-6 md:px-10 py-6 pointer-events-none">
      <Link href="/" className="pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="font-syncopate font-bold text-lg md:text-xl tracking-tighter text-cyber-blue drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
            MADYA
          </span>
          <span className="text-[6px] font-mono text-neutral-500 uppercase tracking-widest hidden md:block">Neural Fluid Nexus</span>
        </motion.div>
      </Link>

      <div className="hidden lg:flex gap-1 p-1 rounded-full glass pointer-events-auto overflow-x-auto max-w-[70vw] no-scrollbar border border-white/10">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "px-4 py-2 rounded-full text-[10px] font-mono transition-all uppercase tracking-widest whitespace-nowrap",
              pathname === item.path
                ? "bg-cyber-blue text-black font-bold shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                : "text-neutral-400 hover:text-white"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4 pointer-events-auto shrink-0">
        <button className="hidden sm:block px-6 py-2 rounded-full border border-cyber-blue/30 text-cyber-blue text-[10px] font-mono hover:bg-cyber-blue hover:text-black transition-all shadow-[0_0_20px_rgba(0,243,255,0.1)]">
          SİSTEM DURUMU
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-4 rounded-2xl glass text-cyber-blue border border-cyber-blue/30 shadow-[0_0_15px_rgba(0,243,255,0.2)] bg-black/40 backdrop-blur-md"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 p-6 glass border border-cyber-blue/20 rounded-[2.5rem] flex flex-col gap-3 pointer-events-auto lg:hidden shadow-[0_20px_100px_rgba(0,0,0,0.8)] bg-black/90 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between mb-4 px-4">
               <span className="text-[8px] font-mono text-cyber-blue uppercase tracking-widest">Sistem Navigasyonu</span>
               <div className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-6 py-5 rounded-2xl text-[10px] font-mono transition-all uppercase tracking-[0.2em] text-center border",
                  pathname === item.path
                    ? "bg-cyber-blue/10 border-cyber-blue text-cyber-blue font-bold shadow-[0_0_20px_rgba(0,243,255,0.15)]"
                    : "text-neutral-400 hover:text-white bg-white/5 border-white/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
