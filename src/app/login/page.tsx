"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";

export default function LoginPage() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Form container with background only for content */}
      <div className="p-10 rounded-3xl w-full max-w-md text-white bg-black/80 backdrop-blur-md">
        <div className="text-center mb-4">
          <span className="text-4xl font-extrabold text-pink-400">ExSeas</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl text-gray-300 font-medium">Welcome Back!</h2>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="username@gmail.com"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Password"
            />
            <div className="text-right mt-1">
              <Link href="#" className="text-white/70 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold text-lg mt-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-white/30" />
          <span className="mx-3 text-white/70 text-sm">or continue with</span>
          <hr className="flex-1 border-white/30" />
        </div>

        {/* Social login buttons */}
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
          Don’t have an account yet?{" "}
          <Link href="#" className="text-pink-400 hover:underline font-medium">
            Register for free
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
