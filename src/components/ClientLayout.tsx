"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentKey, setContentKey] = useState(pathname);

  // Track cursor
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Generate particles
  useEffect(() => {
    const count = 60;
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
      });
    }
    setParticles(arr);
  }, []);

  // Handle route change
  useEffect(() => {
    if (pathname !== contentKey) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setContentKey(pathname);
        setIsTransitioning(false);
      }, 700); // durasi overlay
      return () => clearTimeout(timer);
    }
  }, [pathname, contentKey]);

  return (
    <>
      {/* 🌌 Background Particles, Gradient & Blobs */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* Moving gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, #0f0c29, #302b63, #24243e, #1a1a40, #3a0ca3, #7209b7, #f72585)",
            backgroundSize: "600% 600%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/60"
            style={{ width: p.size, height: p.size }}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{
              x: [
                p.x,
                p.x + Math.sin(Math.random() * Math.PI * 2) * 100,
                p.x + Math.sin(Math.random() * Math.PI * 2) * 50,
                p.x,
              ],
              y: [
                p.y,
                p.y + Math.cos(Math.random() * Math.PI * 2) * 100,
                p.y + Math.cos(Math.random() * Math.PI * 2) * 50,
                p.y,
              ],
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

        {/* Glowing blobs */}
        <motion.div
          className="absolute w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-3xl top-1/4 left-1/3"
          animate={{
            x: [0, 200, -200, 0],
            y: [0, 150, -150, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 45, -45, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl top-2/3 left-2/3"
          animate={{
            x: [0, -150, 150, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, -30, 30, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated gradient wave overlay */}
        <motion.div
          className="absolute w-[200%] h-[200%] bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-400/20 rounded-full top-[-50%] left-[-50%] blur-3xl"
          animate={{
            rotate: [0, 10, -10, 0],
            x: [0, 100, -100, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Cursor with particle trail */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] shadow-[0_0_30px_rgba(236,72,153,0.5)]"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.5), rgba(168,85,247,0.2))",
        }}
        animate={{ x: cursorPos.x - 20, y: cursorPos.y - 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Overlay saat transisi */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Konten halaman baru */}
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.main
            key={contentKey}
            className="pt-20 relative z-10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -15 }}
            transition={{
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
