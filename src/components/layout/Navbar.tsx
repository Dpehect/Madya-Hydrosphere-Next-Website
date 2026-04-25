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
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-6 pointer-events-none">
      <Link href="/" className="pointer-events-auto">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-syncopate font-bold text-lg md:text-xl tracking-tighter text-cyber-blue"
        >
          MADYA
        </motion.span>
      </Link>

      <div className="hidden lg:flex gap-1 p-1 rounded-full glass pointer-events-auto overflow-x-auto max-w-[70vw] no-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "px-4 py-2 rounded-full text-[10px] font-mono transition-all uppercase tracking-widest whitespace-nowrap",
              pathname === item.path
                ? "bg-cyber-blue text-black font-bold"
                : "text-neutral-400 hover:text-white"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4 pointer-events-auto shrink-0">
        <button className="hidden sm:block px-6 py-2 rounded-full border border-cyber-blue/30 text-cyber-blue text-[10px] font-mono hover:bg-cyber-blue hover:text-black transition-all">
          SİSTEM DURUMU
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-3 rounded-full glass text-cyber-blue border border-white/10"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 p-6 glass border border-white/10 rounded-[2rem] flex flex-col gap-4 pointer-events-auto lg:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-6 py-4 rounded-2xl text-xs font-mono transition-all uppercase tracking-widest text-center",
                  pathname === item.path
                    ? "bg-cyber-blue text-black font-bold"
                    : "text-neutral-400 hover:text-white bg-white/5"
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
