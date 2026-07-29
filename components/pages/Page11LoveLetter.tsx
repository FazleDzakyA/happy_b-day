"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LOVE_LETTER_TEXT } from "@/lib/constants";
import { Heart, Scroll } from "lucide-react";

export default function Page11LoveLetter() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-3xl mx-auto text-center">
      {/* Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE8EF]/10 border border-[#F9D976]/40 text-[#F9D976] text-xs font-mono mb-2">
          <Scroll className="w-3.5 h-3.5" />
          <span>From Haydar&apos;s Heart</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976]">
          The Love Letter
        </h2>
      </div>

      {/* Folded Parchment Container with Interactive Ink Trail */}
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#FFF8F8] via-[#FFE8EF]/40 to-[#F5E6DA] dark:from-[#1D1426] dark:via-[#261A33] dark:to-[#170E20] border-2 border-[#F9D976]/40 shadow-2xl overflow-hidden text-left relative"
      >
        {/* Paper Fold Crease Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#F9D976]/20 pointer-events-none" />

        {/* Cursor Ink Glow Trail */}
        <div
          style={{
            top: `${cursorPos.y}px`,
            left: `${cursorPos.x}px`,
          }}
          className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F9D976]/20 blur-md pointer-events-none transition-all duration-75"
        />

        {/* Letter Content */}
        <p className="font-serif text-sm sm:text-base text-[#3D2B33] dark:text-[#FFE8EF] leading-relaxed whitespace-pre-line relative z-10 font-normal">
          {LOVE_LETTER_TEXT}
        </p>

        {/* Wax Stamp Seal */}
        <div className="mt-8 flex justify-end items-center gap-2 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#901D38] via-[#C42E50] to-[#E5A9B4] border-2 border-[#F9D976] flex items-center justify-center shadow-lg text-[#F9D976]">
            <Heart className="w-6 h-6 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
}
