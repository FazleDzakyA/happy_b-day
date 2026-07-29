"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/soundEngine";
import { Moon, Heart, ArrowRight } from "lucide-react";

interface Page12EmotionalSceneProps {
  onProceedToConfession: () => void;
}

export default function Page12EmotionalScene({
  onProceedToConfession,
}: Page12EmotionalSceneProps) {
  const lines = [
    "Di bawah gemerlap langit malam yang tenang...",
    "Ada sebuah rasa yang selama ini kupendam dengan rapi.",
    "Aku telah menyimpan sesuatu yang sangat berharga di dalam hatiku...",
    "Dan hari ini, di bawah indahnya malam 10 Oktober 2026...",
    "Aku ingin mengungkapkan rahasia terbesar di hatiku untukmu."
  ];

  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < lines.length) {
          if (soundEngine) soundEngine.playPianoNote(440 + prev * 60, 2.5, 0.1);
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [lines.length]);

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 max-w-3xl mx-auto text-center min-h-[60vh]">
      {/* Dark Dimming Moon Icon */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="w-16 h-16 rounded-full bg-[#1F122B] border border-[#F9D976]/40 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(249,217,118,0.3)]"
      >
        <Moon className="w-8 h-8 text-[#F9D976]" />
      </motion.div>

      {/* Line-by-Line Reveal */}
      <div className="space-y-6 max-w-xl mx-auto mb-10">
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            {idx < visibleLines && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={`font-serif text-lg sm:text-xl md:text-2xl leading-relaxed ${
                  idx === lines.length - 1
                    ? "text-[#F9D976] font-semibold italic text-2xl sm:text-3xl drop-shadow-md"
                    : "text-[#FFE8EF]/90 font-light"
                }`}
              >
                {line}
              </motion.p>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Proceed Button after all lines are shown */}
      {visibleLines >= lines.length && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onProceedToConfession}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F9D976] via-[#FFD6E8] to-[#F9D976] text-[#3D2B33] font-semibold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(249,217,118,0.5)] flex items-center gap-3"
        >
          <Heart className="w-4 h-4 fill-current text-[#3D2B33]" />
          <span>Buka Halaman Terakhir</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
