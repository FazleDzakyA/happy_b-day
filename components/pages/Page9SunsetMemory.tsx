"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/soundEngine";
import { Sunset, Heart } from "lucide-react";

export default function Page9SunsetMemory() {
  const memoryText = "As the sun sets on another beautiful year, I find myself looking back at all the quiet, ordinary moments that became extraordinary simply because you were there...";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < memoryText.length) {
        setTyped(memoryText.slice(0, index + 1));
        if (index % 5 === 0 && soundEngine) {
          soundEngine.playPenWriteSFX();
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [memoryText]);

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-2xl mx-auto text-center">
      {/* Sunset Icon Badge */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF8C00]/30 via-[#E5A9B4]/20 to-transparent border border-[#F9D976]/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(255,140,0,0.3)]"
      >
        <Sunset className="w-7 h-7 text-[#F9D976]" />
      </motion.div>

      <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#FF8C00] mb-6">
        Sunset Memories
      </h2>

      {/* Warm Sunset Parchment Container */}
      <div className="relative w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#2D1B28]/80 via-[#3A1E2B]/80 to-[#1F121E]/80 border border-[#F9D976]/30 shadow-2xl backdrop-blur-md text-left min-h-[220px]">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F9D976_1px,transparent_1px)] [background-size:12px_12px] rounded-3xl pointer-events-none" />

        <p className="font-serif italic text-lg sm:text-xl text-[#FFE8EF] leading-relaxed relative z-10">
          &ldquo;{typed}&rdquo;
          <span className="inline-block w-1.5 h-5 bg-[#F9D976] ml-1 animate-pulse" />
        </p>

        <div className="mt-6 flex items-center justify-end gap-2 text-xs font-serif text-[#F9D976] italic">
          <Heart className="w-3.5 h-3.5 text-[#F9D976] fill-[#F9D976]" />
          <span>Warmest Reflections</span>
        </div>
      </div>
    </div>
  );
}
