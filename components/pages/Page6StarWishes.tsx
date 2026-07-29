"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { WISH_CARDS, WishCard } from "@/lib/constants";
import { soundEngine } from "@/lib/soundEngine";
import { Star, Sparkles, CheckCircle2 } from "lucide-react";

export default function Page6StarWishes() {
  const [readCards, setReadCards] = useState<number[]>([]);

  const toggleReadCard = (id: number) => {
    if (!readCards.includes(id)) {
      setReadCards([...readCards, id]);
      if (soundEngine) {
        soundEngine.playPianoNote(880, 2.0, 0.12);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-3xl mx-auto text-center">
      {/* Title */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9D976]/15 border border-[#F9D976]/40 text-[#F9D976] text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Constellation</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976]">
          Birthday Wishes
        </h2>
        <p className="text-xs text-[#D4B9C8] font-light mt-1">
          Tap each wish card to release its glowing star into the sky ✨
        </p>
      </div>

      {/* Constellation Star Progress Header */}
      <div className="flex items-center gap-3 mb-6">
        {WISH_CARDS.map((card) => {
          const isRead = readCards.includes(card.id);
          return (
            <motion.div
              key={card.id}
              animate={isRead ? { scale: [1, 1.4, 1], rotate: 360 } : { scale: 1 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                isRead
                  ? "bg-[#F9D976] border-[#F9D976] text-[#3D2B33] shadow-[0_0_15px_rgba(249,217,118,0.9)]"
                  : "bg-white/5 border-white/20 text-gray-500"
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </motion.div>
          );
        })}
      </div>

      {/* Grid of Wish Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
        {WISH_CARDS.map((card: WishCard) => {
          const isRead = readCards.includes(card.id);

          return (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleReadCard(card.id)}
              className={`cursor-pointer p-5 rounded-2xl border transition-all relative overflow-hidden ${
                isRead
                  ? "bg-[#F9D976]/15 border-[#F9D976] shadow-[0_0_20px_rgba(249,217,118,0.2)]"
                  : "glass-card border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{card.icon}</span>
                  <h3 className="font-serif text-base font-semibold text-[#F9D976]">
                    {card.title}
                  </h3>
                </div>
                {isRead ? (
                  <CheckCircle2 className="w-5 h-5 text-[#F9D976]" />
                ) : (
                  <Star className="w-4 h-4 text-gray-400" />
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#FFD6E8]/90 font-light leading-relaxed">
                {card.message}
              </p>

              {isRead && (
                <div className="mt-3 text-[10px] font-mono text-[#F9D976] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Star released to your night sky</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
