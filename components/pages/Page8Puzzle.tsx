"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/soundEngine";
import { Sparkles, Puzzle, ArrowRight, Check } from "lucide-react";

interface Page8PuzzleProps {
  onUnlockNext: () => void;
}

export default function Page8Puzzle({ onUnlockNext }: Page8PuzzleProps) {
  // Tile swap puzzle with 4 romantic quote tiles
  const correctOrder = [1, 2, 3, 4];
  const [tiles, setTiles] = useState([3, 1, 4, 2]); // Initial shuffled order
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const tileData: Record<number, { text: string; sub: string; icon: string }> = {
    1: { text: "You are the warmth", sub: "in every quiet morning", icon: "🌅" },
    2: { text: "The brightest light", sub: "in the darkest night", icon: "✨" },
    3: { text: "My favorite smile", sub: "in a crowded room", icon: "🌸" },
    4: { text: "And the sweet reason", sub: "for every happy thought", icon: "💖" },
  };

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    if (selectedIndex === null) {
      setSelectedIndex(index);
      if (soundEngine) soundEngine.playButtonClickSFX();
    } else {
      // Swap tiles at selectedIndex and index
      const updated = [...tiles];
      const temp = updated[selectedIndex];
      updated[selectedIndex] = updated[index];
      updated[index] = temp;

      setTiles(updated);
      setSelectedIndex(null);
      if (soundEngine) soundEngine.playPianoNote(659.25, 1.0, 0.12);

      // Check if correct
      if (updated.every((val, idx) => val === correctOrder[idx])) {
        setIsSolved(true);
        if (soundEngine) soundEngine.playConfettiFanfare();
        setTimeout(onUnlockNext, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-3xl mx-auto text-center">
      {/* Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9D976]/15 border border-[#F9D976]/40 text-[#F9D976] text-xs font-mono mb-2">
          <Puzzle className="w-3.5 h-3.5" />
          <span>Romantic Tile Game</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976]">
          Arrange The Quote
        </h2>
        <p className="text-xs text-[#D4B9C8] font-light mt-1">
          Tap two tiles to swap their positions until the romantic phrase makes sense!
        </p>
      </div>

      {/* Tiles Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-lg my-4">
        {tiles.map((tileId, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrectPos = tileId === correctOrder[idx];
          const info = tileData[tileId];

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTileClick(idx)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[95px] ${
                isSelected
                  ? "bg-[#F9D976]/25 border-[#F9D976] ring-2 ring-[#F9D976] shadow-lg"
                  : isCorrectPos && isSolved
                  ? "bg-[#F9D976]/20 border-[#F9D976]"
                  : "glass-card border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{info.icon}</span>
                <span className="text-[10px] font-mono text-[#F9D976] font-semibold">
                  Part {tileId}
                </span>
              </div>

              <div>
                <p className="font-serif text-sm font-semibold text-[#FFF0F5]">
                  {info.text}
                </p>
                <p className="text-[11px] text-[#D4B9C8] font-light">
                  {info.sub}
                </p>
              </div>

              {isCorrectPos && isSolved && (
                <div className="absolute top-2 right-2 text-[#F9D976]">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Completion Banner */}
      {isSolved && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#F9D976] text-[#3D2B33] font-semibold text-xs uppercase tracking-wider shadow-xl"
        >
          <Sparkles className="w-4 h-4" />
          <span>Puzzle Complete! Unlocking next page...</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      )}
    </div>
  );
}
