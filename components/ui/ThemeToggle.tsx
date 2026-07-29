"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark/light mode"
      className="fixed bottom-4 left-4 z-40 p-2.5 rounded-full bg-white/10 dark:bg-black/40 border border-white/20 text-[#F9D976] backdrop-blur-md hover:bg-white/20 transition-all shadow-lg active:scale-90"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
