"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GALLERY_PHOTOS, GalleryPhoto } from "@/lib/constants";
import LightboxModal from "@/components/ui/LightboxModal";
import { Camera, Heart, Eye } from "lucide-react";
import Image from "next/image";

export default function Page5Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE8EF]/10 border border-[#F9D976]/40 text-[#F9D976] text-xs font-mono mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>Polaroid Memories</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976]">
          Photo Gallery
        </h2>
      </div>

      {/* Falling Polaroid Stack Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full px-2">
        {GALLERY_PHOTOS.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: -50, rotate: photo.rotation * 3 }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
            transition={{
              duration: 0.7,
              delay: index * 0.12,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
            onClick={() => setSelectedPhoto(photo)}
            className="cursor-pointer group relative bg-white dark:bg-[#1A1224] p-3 rounded-lg shadow-xl border border-[#F9D976]/30 flex flex-col items-center text-center transition-all"
          >
            {/* Tape Effect on Top */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 border border-white/60 shadow-sm rotate-[-2deg] z-10" />

            {/* Photo Canvas / Image Frame */}
            <div className="relative w-full aspect-[4/5] rounded bg-gradient-to-br from-[#FFE8EF] via-[#FFD6E8] to-[#F5E6DA] overflow-hidden flex items-center justify-center mb-3 border border-gray-200 dark:border-gray-800">
              {/* Fallback Polaroid Visual Canvas */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                <Heart className="w-8 h-8 text-[#F9D976] fill-[#F9D976]/40 mb-1 animate-pulse" />
                <span className="text-[10px] font-serif font-semibold text-[#3D2B33] dark:text-[#FFF0F5]">
                  Luthfia Deanis
                </span>
                <span className="text-[8px] text-[#7A5C69] dark:text-[#D4B9C8]">
                  {photo.date}
                </span>
              </div>

              {/* Real Image if uploaded in public/photos/ */}
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover relative z-10 opacity-90 group-hover:opacity-100 transition-opacity"
                unoptimized
              />

              {/* Hover Preview Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Polaroid Handwritten Caption */}
            <p className="font-serif italic text-xs text-[#3D2B33] dark:text-[#FFD6E8] font-medium tracking-tight truncate w-full">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
