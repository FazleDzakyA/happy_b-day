"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

export default function Page2WishesIntro() {
  const fullText = "Dear Luthfia,\n\nAs the clock turns to 10 October 2026, the world celebrates a truly extraordinary soul. This storybook is a collection of wishes, memories, and quiet feelings dedicated entirely to you.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        if (index % 4 === 0 && soundEngine) {
          soundEngine.playPenWriteSFX();
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 max-w-2xl mx-auto text-center">
      {/* Feather Icon */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-12 h-12 rounded-full bg-[#FFE8EF]/10 border border-[#F9D976]/40 flex items-center justify-center mb-6 shadow-sm"
      >
        <Feather className="w-6 h-6 text-[#F9D976]" />
      </motion.div>

      {/* Title */}
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F9D976] mb-6 tracking-wide">
        A Birthday Dedication
      </h2>

      {/* Handwriting / Typing Container */}
      <div className="relative w-full p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-left min-h-[220px]">
        <p className="font-serif italic text-lg sm:text-xl text-[#FFD6E8] leading-relaxed whitespace-pre-line">
          {displayedText}
          <span className="inline-block w-1.5 h-5 bg-[#F9D976] ml-1 animate-pulse" />
        </p>

        {/* Floating Flower Ornaments */}
        <div className="absolute top-3 right-4 text-xl animate-bounce">🌸</div>
        <div className="absolute bottom-3 left-4 text-xl animate-pulse">🌿</div>
      </div>
    </div>
  );
}
