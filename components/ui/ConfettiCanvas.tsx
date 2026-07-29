"use client";

import React, { useEffect, useRef } from "react";

interface ConfettiCanvasProps {
  active: boolean;
}

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: "circle" | "rect" | "heart";
}

export default function ConfettiCanvas({ active }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#F9D976", "#FFD6E8", "#FFE8EF", "#E5A9B4", "#FFF8F8", "#FF69B4", "#FF1493"];
    const shapes: ("circle" | "rect" | "heart")[] = ["circle", "rect", "heart"];

    const particles: ConfettiParticle[] = Array.from({ length: 140 }, () => ({
      x: width * 0.5 + (Math.random() - 0.5) * 300,
      y: height * 0.5 + (Math.random() - 0.5) * 100,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 12,
      speedY: -Math.random() * 14 - 6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      opacity: 1,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.25; // Gravity
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, p.opacity - 0.004);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          // Heart shape
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, 0, 0, p.size);
          ctx.bezierCurveTo(p.size, 0, p.size / 2, -p.size / 2, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      });

      if (particles.some((p) => p.opacity > 0)) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
