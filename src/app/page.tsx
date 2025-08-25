"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link"; 

interface Particle {
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function HomePage() {
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

  // Generate particles after mount
  useEffect(() => {
    const generateParticles = () => {
      const count = 40;
      const arr: Particle[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          delay: Math.random() * 5,
          duration: 10 + Math.random() * 10,
        });
      }
      setParticles(arr);
    };
    generateParticles();
  }, []);

  return (
    <div className="relative text-white scroll-smooth overflow-hidden">
      {/* 🌌 Background Particles */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              background: `radial-gradient(circle, rgba(236,72,153,0.8), rgba(168,85,247,0.3))`,
              filter: "blur(2px)",
            }}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{
              x: [p.x, p.x + Math.sin(i) * 50],
              y: [p.y, window.innerHeight + 100],
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

      {/* 🔥 Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999]"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.5), rgba(168,85,247,0.2))",
        }}
        animate={{
          x: cursorPos.x - 20,
          y: cursorPos.y - 20,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Section 1 - Hero */}
      <section className="relative z-10 h-screen flex flex-col justify-center px-10 md:px-32 bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        <header className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md">
          <h1 className="text-2xl font-extrabold text-purple-400">
            WEB3 BRAND
          </h1>
          <nav className="hidden md:flex gap-8 text-gray-300 font-medium">
            <a href="#" className="hover:text-white transition">
              Solutions & Services
            </a>
            <a href="#" className="hover:text-white transition">
              Platform
            </a>
            <a href="#" className="hover:text-white transition">
              Pricing
            </a>
            <a href="#" className="hover:text-white transition">
              Resources
            </a>
            <a href="#" className="hover:text-white transition">
              Why Us
            </a>
          </nav>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 hover:text-white transition"
            >
              Sign in
            </motion.button>
            {/* Tombol Login */}
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #a855f7" }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-500 text-white font-bold px-5 py-2 rounded-full hover:bg-purple-400 transition"
              >
                Login
              </motion.button>
            </Link>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-tight max-w-4xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Build Brand <br /> Experiences That Last
          </h1>
          <p className="text-lg text-gray-300 mt-6 max-w-xl">
            From identity design to branded assets, we translate your existing
            Web3 strategy into cohesive visual systems.
          </p>

          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("swap-section");
              if (target) {
                setTimeout(() => {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
              }
            }}
            className="inline-block mt-8 bg-pink-500 text-white font-bold px-6 py-3 rounded-full text-lg hover:bg-pink-400 transition cursor-pointer"
          >
            Get Started
          </motion.a>
        </motion.div>
      </section>

      {/* Section 2 - Transfer/Swap */}
      <section
        id="swap-section"
        className="relative z-10 h-screen flex flex-col justify-center items-center px-6 md:px-20 bg-gradient-to-b from-black via-purple-950 to-gray-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-7xl">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
              <span>⭐ 4.9/5 rating 10k+ users</span>
              <span>⚡ Fast and Secure</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-pink-400 uppercase">
              Secure Web3 Transfers
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Join thousands of people sending crypto globally — with gas fees
              as low as{" "}
              <span className="text-pink-400 font-semibold">0.1%</span>.
            </p>

            <ul className="mt-6 space-y-3 text-gray-300">
              <li>
                💸 <b>Low fees</b> — cheaper the more you swap
              </li>
              <li>
                ⚡ <b>Lightning fast</b> — transactions in seconds
              </li>
              <li>
                🔒 <b>Predictable</b> — lock in exchange rate
              </li>
            </ul>

            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px #a855f7" }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-bold text-white"
            >
              Open an account
            </motion.button>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)",
            }}
            className="bg-white text-gray-900 rounded-2xl shadow-2xl p-10 w-full max-w-lg transition"
          >
            <h3 className="text-xl font-bold mb-6">Swap Tokens</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">You Send</label>
              <input
                type="number"
                placeholder="500 USDC"
                className="w-full p-4 border rounded-lg text-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                You Receive
              </label>
              <input
                type="number"
                placeholder="IDRX Amount"
                className="w-full p-4 border rounded-lg text-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Estimated fee: <span className="font-semibold">0.1%</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px #ec4899" }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-4 text-lg rounded-lg"
            >
              Send Money
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - How to Send Money */}
      <section className="relative z-10 w-screen h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-b from-black via-purple-950 to-gray-900 text-white px-6 lg:px-20">
        {/* Left Content */}
        <div className="lg:w-1/2 w-full space-y-6">
          <h2 className="text-4xl font-bold text-pink-400">
            How to send money internationally from Indonesia
          </h2>
          <p className="text-lg text-gray-300">
            Open a free account today in minutes. Then set up your first
            transfer in 3 easy steps.
          </p>

          {/* Steps */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/60 rounded-2xl p-5 border border-pink-500 hover:bg-gray-800/60 transition"
            >
              <h3 className="font-bold text-lg text-pink-400">
                1. Choose where the money's going
              </h3>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>
                  Send to bank accounts around the world. Your recipient doesn't
                  need Wise to receive money.
                </li>
                <li>
                  If your recipient has Wise, you can look them up on our
                  network and send to them in seconds.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/60 rounded-2xl p-5 border border-pink-500 hover:bg-gray-800/60 transition"
            >
              <h3 className="font-bold text-lg text-pink-400">
                2. Choose how much to send
              </h3>
              <p className="text-gray-300 mt-2">
                Enter the amount you want to send. Check out the fees — and see
                exactly how much you’ll get on the other side.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/60 rounded-2xl p-5 border border-pink-500 hover:bg-gray-800/60 transition"
            >
              <h3 className="font-bold text-lg text-pink-400">
                3. Choose how to pay
              </h3>
              <p className="text-gray-300 mt-2">
                Pay in Indonesian rupiah by bank transfer or using money already
                in your Wise account. Once we get the money, we’ll convert it
                and send it to your recipient.
              </p>
              <p className="text-gray-300">
                Depending on how you pay, this usually takes seconds.
              </p>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #ec4899" }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-pink-500 px-6 py-3 rounded-full font-bold text-white hover:bg-pink-400 transition"
          >
            Send money now
          </motion.button>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 w-full flex justify-center mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-3xl p-12 shadow-lg text-center border border-pink-500"
          >
            <div className="text-6xl mb-6">✅</div>
            <h3 className="text-pink-400 font-bold text-2xl">
              YOUR MONEY IS ON THE WAY
            </h3>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
