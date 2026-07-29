"use client";

import React from "react";
import { motion } from "framer-motion";
import { ABOUT_TRAITS } from "@/lib/constants";
import { Sparkles, Heart } from "lucide-react";

export default function Page3AboutYou() {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-3xl mx-auto text-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-2"
      >
        <Sparkles className="w-4 h-4 text-[#F9D976]" />
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976]">
          About You
        </h2>
        <Sparkles className="w-4 h-4 text-[#F9D976]" />
      </motion.div>

      <p className="text-xs sm:text-sm text-[#D4B9C8] font-light mb-8 max-w-lg">
        The subtle qualities that make Luthfia Deanis truly one of a kind.
      </p>

      {/* Grid of Traits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
        {ABOUT_TRAITS.map((trait, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-5 rounded-2xl relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F9D976]/10 rounded-full blur-xl group-hover:bg-[#F9D976]/25 transition-all" />

            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{trait.icon}</span>
              <h3 className="font-serif text-lg font-semibold text-[#F9D976]">
                {trait.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#FFD6E8]/90 font-light leading-relaxed">
              {trait.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Floating Hearts Ornaments */}
      <div className="mt-8 flex items-center justify-center gap-4 text-rose-300 opacity-60">
        <Heart className="w-4 h-4 animate-bounce" />
        <span className="text-xs italic font-serif">A radiant presence in every room</span>
        <Heart className="w-4 h-4 animate-bounce delay-150" />
      </div>
    </div>
  );
}
