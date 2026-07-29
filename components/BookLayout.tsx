"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/soundEngine";
import { ChevronLeft, ChevronRight, BookMarked, Home } from "lucide-react";

interface BookLayoutProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onReturnToHome: () => void;
  children: React.ReactNode;
}

export default function BookLayout({
  currentPage,
  totalPages,
  onPageChange,
  onReturnToHome,
  children,
}: BookLayoutProps) {
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setDirection("next");
      if (soundEngine) soundEngine.playPageFlipSFX();
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setDirection("prev");
      if (soundEngine) soundEngine.playPageFlipSFX();
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  // Keyboard navigation: Left & Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        goToNextPage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        goToPrevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  // Mobile Touch Swipe Navigation
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      goToNextPage();
    } else if (distance < -50) {
      goToPrevPage();
    }
    setTouchStart(null);
  };

  // Page Animation Variants simulating 3D Book Page Flip
  const pageVariants = {
    initial: (dir: "next" | "prev") => ({
      opacity: 0,
      scale: 0.96,
      rotateY: dir === "next" ? 25 : -25,
      transformOrigin: dir === "next" ? "left center" : "right center",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
    exit: (dir: "next" | "prev") => ({
      opacity: 0,
      scale: 0.96,
      rotateY: dir === "next" ? -25 : 25,
      transformOrigin: dir === "next" ? "right center" : "left center",
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const,
      },
    }),
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden selection:bg-none"
    >
      {/* Top Header Navigation Bar */}
      <div className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-auto max-w-5xl mx-auto">
        <button
          onClick={onReturnToHome}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-black/30 border border-white/20 text-xs font-medium text-[#FFD6E8] backdrop-blur-md hover:bg-white/20 transition-all shadow-md active:scale-95"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Beranda Meja</span>
        </button>

        {/* Page Counter Indicator */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F142D]/80 border border-[#F9D976]/30 text-xs font-mono text-[#F9D976] backdrop-blur-md shadow-lg">
          <BookMarked className="w-3.5 h-3.5 text-[#F9D976]" />
          <span>Halaman {currentPage} dari {totalPages}</span>
        </div>
      </div>

      {/* Book Frame Container */}
      <div className="relative w-full max-w-4xl min-h-[80vh] md:min-h-[82vh] my-12 glass-panel rounded-3xl p-4 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden border border-[#F9D976]/30">
        {/* Book Texture Spine Divider (Desktop) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-[#F9D976]/10 to-transparent pointer-events-none hidden md:block" />

        {/* Dynamic Page Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex-1 flex flex-col justify-center relative z-10"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Pagination Controls */}
        <div className="relative z-20 flex items-center justify-between pt-6 border-t border-[#FFD6E8]/10 mt-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium backdrop-blur-md transition-all active:scale-95 ${
              currentPage === 1
                ? "opacity-30 border-gray-600 text-gray-500 cursor-not-allowed"
                : "border-[#F9D976]/40 text-[#F9D976] hover:bg-[#F9D976]/20 bg-[#1F142D]/60 shadow-lg"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Touch Swipe Prompt for mobile */}
          <span className="text-[10px] sm:text-xs text-[#D4B9C8]/70 font-light tracking-wider hidden xs:inline">
            Gunakan Panah atau Geser ↔
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs sm:text-sm font-medium backdrop-blur-md transition-all active:scale-95 ${
              currentPage === totalPages
                ? "opacity-30 border-gray-600 text-gray-500 cursor-not-allowed"
                : "border-[#F9D976]/40 text-[#F9D976] hover:bg-[#F9D976]/20 bg-[#1F142D]/60 shadow-lg"
            }`}
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
