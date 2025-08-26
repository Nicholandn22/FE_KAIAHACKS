"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function LoginPage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

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
    const arr: Particle[] = [];
    for (let i = 0; i < 35; i++) {
      arr.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 8,
      });
    }
    setParticles(arr);
  }, []);

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-900 to-black text-white overflow-hidden">
      {/* 🌌 Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              background:
                "radial-gradient(circle, rgba(59,130,246,0.8), rgba(147,51,234,0.3))",
              filter: "blur(2px)",
            }}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{
              x: [p.x, p.x + Math.sin(i) * 60],
              y: [p.y, window.innerHeight + 120],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ✨ Cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9999]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.3), rgba(147,51,234,0.1))",
        }}
        animate={{
          x: cursorPos.x - 30,
          y: cursorPos.y - 30,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
      />

      {/* 🔐 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 40px rgba(59,130,246,0.6)",
        }}
        className="relative z-10 bg-white/10 backdrop-blur-lg px-10 py-12 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-center text-lg font-semibold mb-2">Your logo</h2>
        <h3 className="text-2xl font-bold mb-6">Login</h3>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="username@gmail.com"
              className="w-full p-3 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end text-sm">
            <a href="#" className="text-blue-200 hover:underline">
              Forgot Password?
            </a>
          </div>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(59,130,246,0.7)",
              backgroundColor: "#2563eb",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-md transition"
          >
            Sign in
          </motion.button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-white/30"></div>
          <span className="mx-2 text-sm text-white/70">or continue with</span>
          <div className="flex-grow h-px bg-white/30"></div>
        </div>

        {/* 🌐 Social Login */}
        <div className="flex justify-center space-x-4">
          {[
            {
              src: "https://www.svgrepo.com/show/475656/google-color.svg",
              alt: "Google",
            },
            {
              src: "https://www.svgrepo.com/show/475654/github-color.svg",
              alt: "Github",
            },
            {
              src: "https://www.svgrepo.com/show/475647/facebook-color.svg",
              alt: "Facebook",
            },
          ].map((icon, i) => (
            <motion.button
              key={i}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(147,51,234,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white rounded-md shadow-md"
            >
              <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
            </motion.button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-white/80">
          Don’t have an account yet?{" "}
          <a href="#" className="text-blue-200 hover:underline font-semibold">
            Register for free
          </a>
        </p>
      </motion.div>
    </div>
  );
}
