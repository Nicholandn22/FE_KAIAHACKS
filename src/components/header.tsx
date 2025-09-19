"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left: Brand */}
        <div className="flex-shrink-0">
          <Link href="/">
            <h1 className="text-3xl md:text-4xl font-extrabold text-pink-400 cursor-pointer">
              ExSeas
            </h1>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex gap-8 text-gray-300 font-medium mx-auto text-lg">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/demo" className="hover:text-white transition">
            Demo
          </Link>
          <Link href="/docs" className="hover:text-white transition">
            Docs
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/token" className="hover:text-white transition">
            Token
          </Link>
        </nav>

        {/* Right: Sign Up & Login */}
        <div className="flex items-center gap-6">
          {/* Sign Up */}
          <Link
            href="/signup"
            className="text-gray-300 hover:text-white transition text-lg font-semibold"
          >
            Sign Up
          </Link>

          {/* Login */}
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px #a855f7" }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 px-5 py-3 rounded-full text-white font-bold text-lg hover:bg-pink-400 transition-all"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
}
