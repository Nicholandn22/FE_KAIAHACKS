import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-black/40 backdrop-blur-xl shadow-2xl rounded-2xl p-10 w-full max-w-md text-center border border-purple-500/30"
      >
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-purple-400 mb-6">
          WEB3 BRAND
        </h1>

        {/* Welcome text */}
        <h2 className="text-white text-2xl font-bold mb-2">Welcome back 👋</h2>
        <p className="text-gray-400 text-sm mb-8">
          New here?{" "}
          <a href="/signup" className="text-pink-400 hover:underline">
            Sign up
          </a>
        </p>

        {/* Form */}
        <form className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-3 rounded-xl bg-black/50 border border-purple-600/40 text-white focus:ring-2 focus:ring-pink-500 outline-none"
          />
          <input
            type="password"
            placeholder="Your password"
            className="px-4 py-3 rounded-xl bg-black/50 border border-purple-600/40 text-white focus:ring-2 focus:ring-pink-500 outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #ec4899" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl transition"
          >
            Log In
          </motion.button>
        </form>

        {/* Extra links */}
        <div className="mt-4">
          <a
            href="#"
            className="text-sm text-pink-400 hover:underline transition"
          >
            Trouble logging in?
          </a>
        </div>

        {/* Social login */}
        <div className="mt-8">
          <p className="text-gray-400 text-sm mb-3">Or log in with</p>
          <div className="flex justify-center gap-4">
            {["G", "F", "A"].map((provider, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black/50 border border-purple-600/40 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-purple-600/40 transition"
              >
                {provider}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
