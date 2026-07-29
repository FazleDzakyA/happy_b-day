"use client";

import React from "react";
import { motion } from "framer-motion";
import { TIMELINE_DATA } from "@/lib/constants";
import { Clock, Star } from "lucide-react";

export default function Page4Timeline() {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F9D976]/15 border border-[#F9D976]/40 text-[#F9D976] text-xs font-mono mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Our Journey</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D976] via-[#FFE8EF] to-[#F9D976]">
          Scrapbook Memories
        </h2>
      </div>

      {/* Vertical Scrapbook Timeline */}
      <div className="relative w-full max-w-xl pl-6 sm:pl-8 border-l-2 border-dashed border-[#F9D976]/40 space-y-6">
        {TIMELINE_DATA.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative group"
          >
            {/* Glowing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#0F0B15] border-2 border-[#F9D976] flex items-center justify-center shadow-[0_0_12px_rgba(249,217,118,0.6)] group-hover:scale-125 transition-transform">
              <Star className="w-3 h-3 text-[#F9D976] fill-[#F9D976]" />
            </div>

            {/* Scrapbook Card */}
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-[#F9D976]/50 transition-all shadow-md">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs text-[#F9D976] tracking-wider uppercase font-semibold">
                  {item.date}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFD6E8]/20 text-[#FFD6E8]">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#FFF0F5] mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D4B9C8] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
