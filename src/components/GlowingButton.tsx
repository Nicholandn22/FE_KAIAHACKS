// components/GlowingButton.tsx
import { motion } from "framer-motion";

export default function GlowingButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 15px 5px #ec4899",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-pink-500 text-white font-bold py-3 px-6 rounded-full transition-all"
    >
      {children}
    </motion.button>
  );
}
