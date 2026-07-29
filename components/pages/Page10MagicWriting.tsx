"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/soundEngine";
import { Feather, Sparkles } from "lucide-react";

export default function Page10MagicWriting() {
  const calligraphyText = "To the one who brings magic into every quiet detail of life...";
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < calligraphyText.length) {
        setText(calligraphyText.slice(0, i + 1));
        if (i % 3 === 0 && soundEngine) {
          soundEngine.playPenWriteSFX();
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [calligraphyText]);

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-2xl mx-auto text-center">
      {/* Title */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9D976]/15 border border-[#F9D976]/40 text-[#F9D976] text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Magic Calligraphy</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976]">
          The Quill In Motion
        </h2>
      </div>

      {/* Parchment Sheet */}
      <div className="relative w-full p-8 sm:p-10 rounded-3xl bg-[#FFF8F8] dark:bg-[#1E1528] border-2 border-[#F9D976]/40 shadow-2xl overflow-hidden min-h-[250px] flex flex-col justify-center">
        {/* Animated Fountain Pen Quill moving along writing line */}
        <motion.div
          animate={{
            x: [0, 200, 50, 180, 0],
            y: [0, 10, -5, 15, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 right-8 text-[#F9D976] pointer-events-none flex items-center gap-1 opacity-80"
        >
          <Feather className="w-8 h-8 -rotate-45" />
          <span className="w-2 h-2 rounded-full bg-[#F9D976] animate-ping" />
        </motion.div>

        {/* Ink Calligraphy Text */}
        <p className="font-serif italic text-xl sm:text-2xl text-[#3D2B33] dark:text-[#F9D976] leading-relaxed tracking-wide text-center">
          &ldquo;{text}&rdquo;
          <span className="inline-block w-2 h-6 bg-[#F9D976] ml-1 animate-pulse" />
        </p>

        {/* Subtle Watermark */}
        <div className="mt-6 text-center text-xs font-serif text-[#7A5C69] dark:text-[#D4B9C8]/50 italic">
          — Inscribed with warmth for Luthfia Deanis
        </div>
      </div>
    </div>
  );
}
