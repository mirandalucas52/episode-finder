"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLES = 24;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const COLORS = ["#8b7355", "#c9a96e", "#e8dcc8", "#6b8f71", "#b8860b", "#d4a574"];

const SuccessConfetti = () => {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string; size: number; rotation: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLES }, (_, i) => ({
        id: i,
        x: randomBetween(-120, 120),
        y: randomBetween(-180, -40),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: randomBetween(4, 8),
        rotation: randomBetween(-180, 180),
      }))
    );

    const timer = setTimeout(() => setParticles([]), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 1,
              x: "50%",
              y: "20%",
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              x: `calc(50% + ${p.x}px)`,
              y: `calc(20% + ${p.y}px)`,
              scale: [0, 1.2, 0.8],
              rotate: p.rotation,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: p.size > 6 ? "2px" : "50%",
              backgroundColor: p.color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SuccessConfetti;
