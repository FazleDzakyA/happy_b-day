"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PERSON_NAME,
  INITIAL_RELATIONSHIP_TIMESTAMP,
  EVASIVE_NO_RESPONSES,
  POETIC_CONFESSION,
} from "@/lib/constants";
import { soundEngine } from "@/lib/soundEngine";
import ConfettiCanvas from "@/components/ui/ConfettiCanvas";
import { Heart, Sparkles, Clock, PartyPopper, Feather } from "lucide-react";

export default function Page13Confession() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [noRotate, setNoRotate] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Evasive "NO" button behavior on hover / tap / touch
  const handleNoEvade = () => {
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 200;
    const randomRot = (Math.random() - 0.5) * 45;
    const nextScale = Math.max(0.4, noScale * 0.85);

    setNoPos({ x: randomX, y: randomY });
    setNoScale(nextScale);
    setNoRotate(randomRot);

    const msg = EVASIVE_NO_RESPONSES[Math.floor(Math.random() * EVASIVE_NO_RESPONSES.length)];
    setToastMessage(msg);
    if (soundEngine) soundEngine.playPianoNote(300, 0.4, 0.08);

    setTimeout(() => setToastMessage(null), 1800);
  };

  // YES Click handler
  const handleAccept = () => {
    setIsAccepted(true);
    if (soundEngine) {
      soundEngine.playConfettiFanfare();
      soundEngine.startBgMusic();
    }
  };

  // Real-time Relationship Counter state
  const [timeDiff, setTimeDiff] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - INITIAL_RELATIONSHIP_TIMESTAMP);

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
      const years = Math.floor(daysTotal / 365);
      const months = Math.floor((daysTotal % 365) / 30);
      const days = Math.floor((daysTotal % 365) % 30);

      setTimeDiff({ years, months, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-3xl mx-auto text-center relative selection:bg-none">
      {/* Confetti & Fireworks Layer */}
      <ConfettiCanvas active={isAccepted} />

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          /* State 1: Poetic Confession Screen */
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center w-full"
          >
            {/* Crown & Feather Icon */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F9D976]/15 border border-[#F9D976]/40 text-[#F9D976] text-xs font-mono mb-4">
              <Feather className="w-3.5 h-3.5" />
              <span>{POETIC_CONFESSION.header}</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            {/* Giant Pulsing Animated Heart */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FFD6E8] via-[#FFE8EF] to-[#F9D976] flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(249,217,118,0.6)]"
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#901D38] fill-current" />
            </motion.div>

            {/* Poetic Lines Card */}
            <div className="w-full p-5 sm:p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-center mb-6 space-y-3">
              {POETIC_CONFESSION.lines.map((line, i) => (
                <p key={i} className="font-serif italic text-sm sm:text-base text-[#FFD6E8] leading-relaxed">
                  &ldquo;{line}&rdquo;
                </p>
              ))}
            </div>

            {/* Main Proposal Header & Question */}
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976] mb-1">
              {PERSON_NAME}
            </h2>

            <h3 className="font-serif italic text-xl sm:text-2xl text-[#FFF0F5] font-semibold mb-2">
              {POETIC_CONFESSION.questionSubtext}
            </h3>

            <p className="text-xs font-mono text-[#F9D976] tracking-widest uppercase mb-4 opacity-80">
              {POETIC_CONFESSION.englishTag}
            </p>

            {/* Interactive Evasive Toast Message */}
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 px-4 py-1 rounded-full bg-[#F9D976] text-[#3D2B33] font-semibold text-xs shadow-md animate-bounce"
              >
                {toastMessage}
              </motion.div>
            )}

            {/* YES & NO Interactive Buttons */}
            <div className="relative flex items-center justify-center gap-6 my-4 min-h-[70px] w-full">
              {/* YES BUTTON */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAccept}
                className="px-9 py-3.5 rounded-full bg-gradient-to-r from-[#F9D976] via-[#E5A9B4] to-[#F9D976] text-[#3D2B33] font-bold text-base sm:text-lg tracking-wider uppercase shadow-[0_0_30px_rgba(249,217,118,0.7)] flex items-center gap-3 active:scale-95"
              >
                <Heart className="w-5 h-5 fill-current text-[#3D2B33]" />
                <span>MAU / YES ❤️</span>
              </motion.button>

              {/* NO BUTTON (Evasive Physics) */}
              <motion.button
                animate={{
                  x: noPos.x,
                  y: noPos.y,
                  scale: noScale,
                  rotate: noRotate,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={handleNoEvade}
                onTouchStart={handleNoEvade}
                onClick={handleNoEvade}
                className="px-7 py-3 rounded-full bg-white/10 border border-white/20 text-[#FFD6E8] font-medium text-sm tracking-wider uppercase backdrop-blur-md hover:bg-white/20 transition-all select-none"
              >
                <span>ENGGA / NO 🙈</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* State 2: Acceptance Celebration & Real-Time Relationship Timer */
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col items-center justify-center w-full"
          >
            {/* Celebration Badge */}
            <div className="w-16 h-16 rounded-full bg-[#F9D976] text-[#3D2B33] flex items-center justify-center mb-4 shadow-[0_0_35px_rgba(249,217,118,0.9)]">
              <PartyPopper className="w-8 h-8 animate-bounce" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976] mb-2">
              Kisah Kita Dimulai
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#FFD6E8] mb-6">
              Our Story Begins • 10 Oktober 2026
            </p>

            {/* Real-Time Relationship Timer Display */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#F9D976]/40 shadow-2xl w-full max-w-lg mb-6">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#F9D976] uppercase tracking-widest mb-4">
                <Clock className="w-4 h-4" />
                <span>Waktu Kebersamaan Kita</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#F9D976]">
                    {timeDiff.years}
                  </span>
                  <p className="text-[10px] uppercase text-[#D4B9C8]">Tahun</p>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#F9D976]">
                    {timeDiff.months}
                  </span>
                  <p className="text-[10px] uppercase text-[#D4B9C8]">Bulan</p>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#F9D976]">
                    {timeDiff.days}
                  </span>
                  <p className="text-[10px] uppercase text-[#D4B9C8]">Hari</p>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#F9D976]">
                    {timeDiff.hours}
                  </span>
                  <p className="text-[10px] uppercase text-[#D4B9C8]">Jam</p>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#F9D976]">
                    {timeDiff.minutes}
                  </span>
                  <p className="text-[10px] uppercase text-[#D4B9C8]">Menit</p>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#F9D976]">
                    {timeDiff.seconds}
                  </span>
                  <p className="text-[10px] uppercase text-[#D4B9C8]">Detik</p>
                </div>
              </div>
            </div>

            <p className="text-xs font-serif italic text-[#FFE8EF]/80">
              &ldquo;Terima kasih telah menerima rasa ini. Janjiku untuk selalu menjaga hatimu.&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
