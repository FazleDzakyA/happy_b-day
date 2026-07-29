"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/soundEngine";
import { Volume2, VolumeX, Music } from "lucide-react";

export default function AmbientAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    if (soundEngine) {
      soundEngine.setMuted(isMuted);
      soundEngine.setVolume(volume);
    }
  }, [isMuted, volume]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 pointer-events-auto">
      {showVolumeSlider && (
        <div className="px-3 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-[#F9D976] cursor-pointer"
          />
        </div>
      )}

      <button
        onClick={toggleMute}
        onMouseEnter={() => setShowVolumeSlider(true)}
        aria-label="Audio Mute Toggle"
        className="p-2.5 rounded-full bg-white/10 dark:bg-black/40 border border-white/20 text-[#F9D976] backdrop-blur-md hover:bg-white/20 transition-all shadow-lg active:scale-90 flex items-center justify-center"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-gray-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#F9D976] animate-pulse" />
        )}
      </button>
    </div>
  );
}
