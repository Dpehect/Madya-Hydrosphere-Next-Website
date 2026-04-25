"use client";
import React, { useEffect } from "react";
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);
  return <>{children}</>;
}
