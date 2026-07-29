"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Crown } from "lucide-react";
import { PERSON_NAME, SPECIAL_DATE, AUTHOR_NAME } from "@/lib/constants";

interface Page1CoverProps {
  onOpenStory: () => void;
}

export default function Page1Cover({ onOpenStory }: Page1CoverProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-6 px-4">
      {/* Decorative Crown */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#F9D976]/30 via-[#FFD6E8]/20 to-transparent border border-[#F9D976]/60 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(249,217,118,0.3)]"
      >
        <Crown className="w-8 h-8 text-[#F9D976]" />
      </motion.div>

      {/* Gold Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#F9D976] mb-3"
      >
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>Selamat Ulang Tahun</span>
        <Sparkles className="w-4 h-4 animate-spin" />
      </motion.div>

      {/* Main Name Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976] tracking-wide mb-4 drop-shadow-lg"
      >
        {PERSON_NAME}
      </motion.h1>

      {/* Date */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 0.6 }}
        className="font-serif italic text-base sm:text-lg text-[#FFD6E8] mb-8"
      >
        {SPECIAL_DATE}
      </motion.p>

      {/* Decorative Gold Divider */}
      <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#F9D976] to-transparent mx-auto mb-10" />

      {/* Open Story Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.8 }}
        onClick={onOpenStory}
        className="relative group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F9D976] via-[#E5A9B4] to-[#F9D976] text-[#3D2B33] font-semibold text-sm sm:text-base tracking-wider uppercase shadow-[0_10px_25px_rgba(249,217,118,0.4)] flex items-center gap-3 transition-all"
      >
        <Heart className="w-4 h-4 fill-current text-[#3D2B33]" />
        <span>Buka Cerita Kita • Open My Story</span>
      </motion.button>

      {/* Author Footer */}
      <p className="mt-12 text-xs font-light text-[#D4B9C8]/70 tracking-widest uppercase">
        Ditulis & Dirancang Penuh Cinta oleh {AUTHOR_NAME}
      </p>
    </div>
  );
}
