"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = 50; // jumlah partikel
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 5,
      });
    }
    setParticles(arr);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/70"
          style={{
            width: p.size,
            height: p.size,
          }}
          initial={{ x: p.x, y: p.y, opacity: 0 }}
          animate={{
            x: [p.x, p.x + Math.random() * 50 - 25, p.x],
            y: [p.y, p.y + Math.random() * 50 - 25, p.y],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
