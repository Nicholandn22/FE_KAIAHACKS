"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { useState } from "react";

interface Country {
  name: string;
  code: string; // kode telepon
  abbr: string; // singkatan 3 huruf
}

const countries: Country[] = [
  { name: "United States", code: "+1", abbr: "USA" },
  { name: "Indonesia", code: "+62", abbr: "IDN" },
  { name: "United Kingdom", code: "+44", abbr: "UK" },
  { name: "Germany", code: "+49", abbr: "DEU" },
  { name: "France", code: "+33", abbr: "FRA" },
  { name: "Japan", code: "+81", abbr: "JPN" },
  { name: "India", code: "+91", abbr: "IND" },
];

export default function SignUpPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[1]); // default Indonesia

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-10 rounded-3xl w-full max-w-md text-white bg-black/80 backdrop-blur-md">
        <div className="text-center mb-4">
          <span className="text-4xl font-extrabold text-pink-400">ExSeas</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl text-gray-300 font-medium">
            Create Your Account
          </h2>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-white/80 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="username@gmail.com"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Phone Number</label>
            <div className="flex gap-2">
              <select
                value={selectedCountry.name}
                onChange={(e) =>
                  setSelectedCountry(
                    countries.find((c) => c.name === e.target.value) ||
                      countries[1]
                  )
                }
                className="w-1/3 rounded-lg px-3 py-3 bg-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.abbr} ({c.code}) {/* Singkatan + kode telepon */}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder={selectedCountry.code + " 81234567890"}
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold text-lg mt-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-white/30" />
          <span className="mx-3 text-white/70 text-sm">or continue with</span>
          <hr className="flex-1 border-white/30" />
        </div>

        <div className="flex justify-center gap-4">
          <button className="bg-white rounded-lg p-3 hover:scale-105 transition-all duration-300 hover:shadow-md">
            <FcGoogle size={24} />
          </button>
          <button className="bg-white rounded-lg p-3 hover:scale-105 transition-all duration-300 hover:shadow-md">
            <FaGithub size={24} className="text-gray-800" />
          </button>
          <button className="bg-white rounded-lg p-3 hover:scale-105 transition-all duration-300 hover:shadow-md">
            <FaFacebook size={24} className="text-blue-800" />
          </button>
        </div>

        <p className="text-center text-white/70 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
