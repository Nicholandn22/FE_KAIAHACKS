export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-400 mb-6">
          Login
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold py-3 rounded-lg transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
