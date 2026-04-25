"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full pointer events-none overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 [mask image:radial gradient(ellipse at_center,transparent_20%,black)] bg dark-bg" />
      <div className="absolute h-full w-full bg grid-white/[0.02]" />
    </div>
  );
};
