"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        const diff = Math.floor(Math.random() * 8) + 3;
        return Math.min(100, prev + diff);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0B15] text-[#FFF0F5] px-6 selection:bg-none"
        >
          {/* Glowing Ambient Light Background */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F9D976]/20 via-[#FFD6E8]/10 to-transparent blur-3xl pointer-events-none animate-pulse" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center max-w-md"
          >
            {/* Crown Heart Icon */}
            <div className="relative mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed border-[#F9D976]/40"
              />
              <div className="w-16 h-16 rounded-full bg-[#FFE8EF]/10 border border-[#F9D976]/40 flex items-center justify-center shadow-[0_0_25px_rgba(249,217,118,0.3)]">
                <Heart className="w-8 h-8 text-[#F9D976] fill-[#F9D976]/20 animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFD6E8] to-[#F9D976] font-semibold tracking-wide mb-2">
              Luthfia Deanis
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4B9C8] mb-8 font-light">
              10 Oktober 2026 • Persembahan Cinta Oleh Haydar
            </p>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-serif italic text-base md:text-lg text-[#FFD6E8]/90 mb-10 px-4 leading-relaxed"
            >
              &ldquo;Setiap kisah yang indah selalu dimulai dari satu halaman pertama...&rdquo;
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-full max-w-xs bg-white/10 rounded-full h-1.5 p-0.5 backdrop-blur-sm border border-white/10 overflow-hidden mb-4 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#F9D976] via-[#FFD6E8] to-[#F5C6D0] rounded-full shadow-[0_0_12px_rgba(249,217,118,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Percentage & Sparkle Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#F9D976] tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{progress}% Membuka Cerita...</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
