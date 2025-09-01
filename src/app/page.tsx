"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import GlowingButton from "@/components/GlowingButton";

export default function HomePage() {
  return (
    <div className="relative text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-8">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          ExSeas
        </h1>
        <p className="text-lg text-gray-300 mt-6 max-w-2xl">
          Dari wallet ke rekening dalam sekali jalan. Visual, simpel, tanpa
          ribet.
        </p>

        <div className="flex gap-6 mt-10 justify-center">
          <Link href="/demo">
            <GlowingButton>Coba Demo</GlowingButton>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-950 text-center">
        <h2 className="text-4xl font-bold text-pink-400 mb-12">
          Bagaimana Cara Kerjanya?
        </h2>
        <div className="grid md:grid-cols-3 gap-12 px-6 max-w-6xl mx-auto">
          {[
            {
              title: "1. Hubungkan Wallet",
              desc: "Connect ke MetaMask untuk baca saldo USDT/USDC.",
              border: "border-pink-500",
            },
            {
              title: "2. Swap di DEX",
              desc: "Swap stablecoin ke IDRX via Uniswap di KAIA Blockchain.",
              border: "border-purple-500",
            },
            {
              title: "3. Tarik ke Rekening",
              desc: "Hasil swap IDRX langsung masuk rekening via API IDRX.",
              border: "border-pink-500",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow:
                  "0 0 25px rgba(236,72,153,0.6), 0 0 50px rgba(168,85,247,0.4)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className={`bg-gray-900 rounded-2xl p-8 border ${item.border} cursor-pointer transition`}
            >
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">
          Fitur Utama
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: "🔗",
              title: "Integrasi Wallet",
              desc: "Langsung connect ke MetaMask.",
            },
            {
              icon: "🔄",
              title: "Swap Multi Stablecoin",
              desc: "Pilih USDT, USDC, BUSD, dll.",
            },
            {
              icon: "💳",
              title: "Langsung ke Bank",
              desc: "Withdraw via API IDRX.",
            },
            {
              icon: "📊",
              title: "Visual Flow Builder",
              desc: "Drag & drop sederhana.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow:
                  "0 0 25px rgba(168,85,247,0.6), 0 0 50px rgba(236,72,153,0.4)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="bg-gray-900 p-6 rounded-2xl border border-gray-700 cursor-pointer transition"
            >
              <div className="text-2xl">
                {item.icon} <b>{item.title}</b>
              </div>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-950 px-6">
        <h2 className="text-4xl font-bold text-center text-pink-400 mb-12">
          FAQ
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "Apakah perlu smart contract?",
              a: "Tidak, cukup manual call wallet via MetaMask.",
            },
            { q: "Apakah langsung masuk rekening?", a: "Ya, via API IDRX." },
            {
              q: "Apakah semua stablecoin bisa?",
              a: "Mulai dari USDT, bisa ditambah lain.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                y: -4,
                scale: 1.03,
                boxShadow:
                  "0 0 15px rgba(236,72,153,0.4), 0 0 30px rgba(168,85,247,0.2)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-gray-900 p-6 rounded-xl border border-gray-700 cursor-pointer transition"
            >
              <h3 className="font-bold text-lg">{item.q}</h3>
              <p className="text-gray-300 mt-1">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
