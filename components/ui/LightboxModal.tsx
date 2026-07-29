"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Heart } from "lucide-react";
import Image from "next/image";

interface LightboxModalProps {
  photo: {
    src: string;
    caption: string;
    date: string;
  } | null;
  onClose: () => void;
}

export default function LightboxModal({ photo, onClose }: LightboxModalProps) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-[#FFF8F8] dark:bg-[#1D1528] rounded-3xl p-6 border border-[#F9D976]/40 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Container with Fallback Visual Canvas */}
          <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#FFE8EF] to-[#FFD6E8] flex items-center justify-center border border-[#F9D976]/20">
            {/* Fallback Polaroid Visual */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#F9D976]/20 border border-[#F9D976] flex items-center justify-center mb-3 shadow-inner">
                <Heart className="w-10 h-10 text-[#F9D976] fill-[#F9D976]" />
              </div>
              <h4 className="font-serif text-xl text-[#3D2B33] dark:text-[#FFF0F5] font-semibold">
                Luthfia Deanis
              </h4>
              <p className="text-xs text-[#7A5C69] dark:text-[#D4B9C8] font-light mt-1">
                A Precious Moment with Haydar
              </p>
            </div>

            {/* Next.js Image if uploaded */}
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover relative z-10 onError-hidden"
              unoptimized
            />
          </div>

          {/* Caption & Date */}
          <div className="flex items-center justify-between pt-2">
            <h3 className="font-serif text-lg font-semibold text-[#3D2B33] dark:text-[#FFF0F5]">
              {photo.caption}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#F9D976] font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>{photo.date}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
