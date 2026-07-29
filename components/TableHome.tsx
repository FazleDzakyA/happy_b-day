"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/soundEngine";
import { Sparkles, BookOpen } from "lucide-react";

interface TableHomeProps {
  onOpenBook: () => void;
}

export default function TableHome({ onOpenBook }: TableHomeProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOpening, setIsOpening] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const handleBookClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    if (soundEngine) {
      soundEngine.playPageFlipSFX();
      soundEngine.startBgMusic();
    }
    setTimeout(onOpenBook, 900);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0A0710] selection:bg-none px-4"
    >
      {/* Window Moonlight Beam from top right */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-[#FFE8EF]/15 via-[#F9D976]/5 to-transparent blur-3xl pointer-events-none transform rotate-12" />

      {/* Parallax Container */}
      <motion.div
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="relative flex flex-col items-center justify-center"
      >
        {/* Wooden Table Surface */}
        <div className="relative w-[92vw] max-w-4xl h-[70vh] max-h-[550px] rounded-3xl bg-gradient-to-b from-[#2B1B17] via-[#1F120E] to-[#120B09] border border-[#5C3E34]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex items-center justify-center p-6 md:p-12 overflow-hidden">
          {/* Wood Grain Texture Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#8B5A2B_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Moonlight Window Highlight on Table */}
          <div className="absolute top-0 right-10 w-96 h-64 bg-gradient-to-br from-white/10 via-[#FFE8EF]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Warm Candle (Top Left) */}
          <div className="absolute top-8 left-8 md:left-14 flex flex-col items-center pointer-events-none">
            {/* Candle Flame & Flickering Aura */}
            <motion.div
              animate={{
                scale: [1, 1.15, 0.95, 1.1, 1],
                opacity: [0.85, 1, 0.9, 0.95, 0.85],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-4 h-8 bg-gradient-to-t from-[#FF8C00] via-[#F9D976] to-[#FFF] rounded-full shadow-[0_0_35px_rgba(249,217,118,0.9)] -mb-1"
            />
            {/* Candle Stick */}
            <div className="w-10 h-24 bg-gradient-to-r from-[#F5E6DA] via-[#FFF8F8] to-[#E2D2C3] rounded-t-lg shadow-md border-t border-white/40" />
            {/* Wooden Coaster */}
            <div className="w-14 h-3 bg-[#4A3228] rounded-full shadow-lg" />
          </div>

          {/* Cup of Tea (Top Right) */}
          <div className="absolute top-10 right-8 md:right-14 flex flex-col items-center pointer-events-none">
            {/* Animated Tea Steam */}
            <motion.div
              animate={{
                y: [-5, -20],
                opacity: [0, 0.5, 0],
                x: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-10 bg-white/20 blur-md rounded-full mb-1"
            />
            {/* Cup & Saucer */}
            <div className="relative w-14 h-12 bg-gradient-to-br from-[#FFF8F8] to-[#FFE8EF] rounded-b-2xl border border-white/60 shadow-lg flex items-center justify-center">
              <div className="w-10 h-8 rounded-b-xl bg-[#5C3A21]/40 border-t border-[#7A4B29]" />
              <div className="absolute -right-3 top-2 w-4 h-6 border-2 border-[#FFF8F8] rounded-r-full" />
            </div>
            <div className="w-18 h-2 bg-[#E5D3C5] rounded-full shadow-md mt-0.5" />
          </div>

          {/* Lily Flowers (Bottom Right) */}
          <div className="absolute bottom-6 right-8 md:right-12 pointer-events-none opacity-90">
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl filter drop-shadow-[0_4px_12px_rgba(249,217,118,0.3)]"
            >
              🌸🌿
            </motion.div>
          </div>

          {/* Realistic Vintage Book (Center Interactive Target) */}
          <motion.div
            onClick={handleBookClick}
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.98 }}
            animate={isOpening ? { scale: 1.25, opacity: 0 } : { scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative cursor-pointer group z-20"
          >
            {/* Hover Floating Glow Dust */}
            <div className="absolute -inset-8 bg-gradient-to-r from-[#F9D976]/0 via-[#F9D976]/25 to-[#FFD6E8]/0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Vintage Book Spine & Leather Cover */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[400px] h-[380px] sm:h-[440px] bg-gradient-to-br from-[#4A1E29] via-[#2A1017] to-[#1A080C] rounded-r-2xl rounded-l-md border-r-4 border-y-2 border-[#F9D976]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between p-8 text-center overflow-hidden">
              {/* Gold Embossed Floral Frame */}
              <div className="absolute inset-3 border-2 border-dashed border-[#F9D976]/40 rounded-r-xl rounded-l-sm pointer-events-none" />

              {/* Book Spine Detail */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#150508] via-[#33121B] to-[#1A080C] border-r border-[#F9D976]/40 flex flex-col justify-around items-center py-4">
                <div className="w-3 h-0.5 bg-[#F9D976]/60" />
                <div className="w-3 h-0.5 bg-[#F9D976]/60" />
                <div className="w-3 h-0.5 bg-[#F9D976]/60" />
              </div>

              {/* Cover Top Header */}
              <div className="relative z-10 pt-4 pl-4">
                <div className="flex items-center justify-center gap-2 text-[#F9D976] text-xs font-mono uppercase tracking-[0.25em]">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Kisah Romantis</span>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
              </div>

              {/* Center Title Gold Typography */}
              <div className="relative z-10 pl-4 my-auto">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976] tracking-wide mb-3 drop-shadow-md">
                  Luthfia Deanis
                </h2>
                <p className="font-serif italic text-sm text-[#FFD6E8]/90">
                  10 Oktober 2026
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#F9D976] to-transparent mx-auto mt-4" />
              </div>

              {/* Cover Footer Prompt */}
              <div className="relative z-10 pl-4 pb-2">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F9D976]/15 border border-[#F9D976]/40 text-[#F9D976] text-xs font-medium tracking-wider uppercase backdrop-blur-md shadow-lg group-hover:bg-[#F9D976]/30 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Klik Untuk Membuka Buku</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Sub-Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
        className="mt-6 text-xs text-[#D4B9C8] font-light tracking-widest uppercase text-center"
      >
        Sebuah Persembahan Spesial Oleh Haydar
      </motion.p>
    </div>
  );
}
