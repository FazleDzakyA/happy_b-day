"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
}

interface LilyPetal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse Parallax Position
    let mouseX = width / 2;
    let mouseY = height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize Twinkling Stars
    const starCount = Math.floor((width * height) / 4500);
    const stars: Particle[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      color: "#FFFFFF",
      alpha: Math.random(),
      speedX: 0,
      speedY: 0,
      pulseSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
    }));

    // Initialize Fireflies
    const fireflyCount = 28;
    const fireflies: Particle[] = Array.from({ length: fireflyCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1.5,
      color: "#F9D976",
      alpha: Math.random() * 0.8 + 0.2,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      pulseSpeed: Math.random() * 0.03 + 0.01,
    }));

    // Initialize Lily Petals
    const petalCount = 18;
    const petals: LilyPetal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.random() * 0.5 - 0.25,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.4,
    }));

    let auroraTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Slow Moving Aurora Gradient Background
      auroraTime += 0.003;
      const auroraGradient = ctx.createLinearGradient(
        Math.sin(auroraTime) * 100,
        0,
        width + Math.cos(auroraTime) * 100,
        height
      );
      auroraGradient.addColorStop(0, "#0B0713");
      auroraGradient.addColorStop(0.35, "#180D26");
      auroraGradient.addColorStop(0.7, "#2B1432");
      auroraGradient.addColorStop(1, "#0A0610");

      ctx.fillStyle = auroraGradient;
      ctx.fillRect(0, 0, width, height);

      // Aurora glow wave overlay
      const waveX = Math.sin(auroraTime * 0.8) * (width * 0.3);
      const auroraWave = ctx.createRadialGradient(
        width * 0.5 + waveX,
        height * 0.3,
        10,
        width * 0.5,
        height * 0.4,
        width * 0.7
      );
      auroraWave.addColorStop(0, "rgba(232, 168, 200, 0.08)");
      auroraWave.addColorStop(0.5, "rgba(249, 217, 118, 0.05)");
      auroraWave.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = auroraWave;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Twinkling Stars
      ctx.save();
      stars.forEach((star) => {
        star.alpha += star.pulseSpeed;
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.pulseSpeed = -star.pulseSpeed;
        }

        const parallaxX = (mouseX - width / 2) * 0.01 * (star.radius / 2);
        const parallaxY = (mouseY - height / 2) * 0.01 * (star.radius / 2);

        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 3. Draw Floating Fireflies
      ctx.save();
      fireflies.forEach((ff) => {
        ff.x += ff.speedX;
        ff.y += ff.speedY;

        if (ff.x < 0) ff.x = width;
        if (ff.x > width) ff.x = 0;
        if (ff.y < 0) ff.y = height;
        if (ff.y > height) ff.y = 0;

        ff.alpha += Math.sin(auroraTime * 5 + ff.x) * 0.01;
        const alpha = Math.max(0.2, Math.min(1, ff.alpha));

        const glow = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.radius * 4);
        glow.addColorStop(0, `rgba(249, 217, 118, ${alpha})`);
        glow.addColorStop(0.5, `rgba(255, 214, 232, ${alpha * 0.4})`);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ff.x, ff.y, ff.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(ff.x, ff.y, ff.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 4. Draw Falling Lily Petals
      ctx.save();
      petals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.x += Math.sin(petal.y * 0.01 + petal.rotation) * 0.5;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        ctx.globalAlpha = petal.opacity;

        // Draw soft lily petal path
        ctx.fillStyle = "#FFE8EF";
        ctx.beginPath();
        ctx.moveTo(0, -petal.size);
        ctx.bezierCurveTo(
          petal.size * 0.6,
          -petal.size * 0.3,
          petal.size * 0.6,
          petal.size * 0.6,
          0,
          petal.size
        );
        ctx.bezierCurveTo(
          -petal.size * 0.6,
          petal.size * 0.6,
          -petal.size * 0.6,
          -petal.size * 0.3,
          0,
          -petal.size
        );
        ctx.fill();

        // Inner rose vein
        ctx.strokeStyle = "rgba(245, 198, 208, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -petal.size * 0.7);
        ctx.lineTo(0, petal.size * 0.7);
        ctx.stroke();

        ctx.restore();
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
