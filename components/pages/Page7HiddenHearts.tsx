"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/soundEngine";
import { Heart, Sparkles, Trophy, ArrowRight } from "lucide-react";

interface Page7HiddenHeartsProps {
  onUnlockNext: () => void;
}

export default function Page7HiddenHearts({ onUnlockNext }: Page7HiddenHeartsProps) {
  const [foundIds, setFoundIds] = useState<number[]>([]);
  const totalHearts = 5;

  const heartsPos = [
    { id: 1, top: "20%", left: "15%", label: "Flower Bed" },
    { id: 2, top: "65%", left: "80%", label: "Candle Glow" },
    { id: 3, top: "35%", left: "70%", label: "Soft Cloud" },
    { id: 4, top: "75%", left: "25%", label: "Lily Stem" },
    { id: 5, top: "50%", left: "45%", label: "Secret Corner" },
  ];

  const handleHeartClick = (id: number) => {
    if (!foundIds.includes(id)) {
      const updated = [...foundIds, id];
      setFoundIds(updated);
      if (soundEngine) {
        soundEngine.playPianoNote(523.25 + updated.length * 100, 1.5, 0.15);
      }
      if (updated.length === totalHearts) {
        if (soundEngine) soundEngine.playConfettiFanfare();
        setTimeout(onUnlockNext, 1200);
      }
    }
  };

  const isCompleted = foundIds.length === totalHearts;

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-3xl mx-auto text-center">
      {/* Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE8EF]/10 border border-[#F9D976]/40 text-[#F9D976] text-xs font-mono mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Secret Garden Game</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976]">
          Hidden Hearts
        </h2>
        <p className="text-xs text-[#D4B9C8] font-light mt-1">
          Find all 5 hidden glowing hearts scattered across the lily garden to unlock the next chapter!
        </p>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-mono text-[#F9D976] tracking-wider uppercase">
          Hearts Found: {foundIds.length} / {totalHearts}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: totalHearts }).map((_, idx) => (
            <Heart
              key={idx}
              className={`w-4 h-4 transition-all ${
                idx < foundIds.length
                  ? "text-[#F9D976] fill-[#F9D976] scale-110 shadow-md"
                  : "text-gray-600 fill-none opacity-40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Interactive Garden Box */}
      <div className="relative w-full h-[320px] sm:h-[360px] rounded-2xl bg-gradient-to-br from-[#1F1228] via-[#2A1634] to-[#120B1A] border border-[#F9D976]/30 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Garden Decorative Elements */}
        <div className="absolute top-6 left-6 text-3xl opacity-30 select-none">🌸</div>
        <div className="absolute bottom-6 right-6 text-4xl opacity-20 select-none">🌿</div>
        <div className="absolute top-1/2 left-10 text-2xl opacity-25 select-none">✨</div>
        <div className="absolute bottom-10 left-1/3 text-3xl opacity-20 select-none">🌙</div>

        {/* Hidden Hearts Buttons */}
        {heartsPos.map((item) => {
          const isFound = foundIds.includes(item.id);
          return (
            <motion.button
              key={item.id}
              style={{ top: item.top, left: item.left }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleHeartClick(item.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all ${
                isFound
                  ? "bg-[#F9D976] text-[#3D2B33] shadow-[0_0_20px_rgba(249,217,118,0.9)] scale-125"
                  : "bg-white/5 border border-white/10 text-[#FFD6E8]/30 hover:text-[#F9D976] hover:bg-white/15"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFound ? "fill-current" : ""}`} />
            </motion.button>
          );
        })}

        {/* Completion Banner Overlay */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-20"
          >
            <Trophy className="w-12 h-12 text-[#F9D976] mb-2 animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-[#F9D976]">
              All Hearts Found!
            </h3>
            <p className="text-xs text-[#FFD6E8] font-light mt-1 mb-4">
              Unlocking the next romantic chapter...
            </p>
            <button
              onClick={onUnlockNext}
              className="px-6 py-2 rounded-full bg-[#F9D976] text-[#3D2B33] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
