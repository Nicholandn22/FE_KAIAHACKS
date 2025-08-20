// src/app/page.tsx
"use client";

import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";

export default function HomePage() {
	// Custom Cursor State
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [cursorVariant, setCursorVariant] = useState("default");

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			setCursorPos({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", moveCursor);
		return () => window.removeEventListener("mousemove", moveCursor);
	}, []);

	const variants = {
		default: {
			x: cursorPos.x - 16,
			y: cursorPos.y - 16,
			transition: { type: "spring", mass: 0.5 },
		},
		hover: {
			x: cursorPos.x - 32,
			y: cursorPos.y - 32,
			scale: 2,
			backgroundColor: "#9333ea",
			mixBlendMode: "difference" as const,
		},
	};

	return (
		<div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white overflow-hidden">
			{/* Custom Cursor */}
			<motion.div
				className="fixed top-0 left-0 w-8 h-8 rounded-full bg-purple-500 pointer-events-none z-50"
				variants={variants}
				animate={cursorVariant}
			/>

			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center h-screen text-center space-y-6">
				<motion.h1
					className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					onMouseEnter={() => setCursorVariant("hover")}
					onMouseLeave={() => setCursorVariant("default")}
				>
					Welcome to Web3 World
				</motion.h1>

				<motion.p
					className="text-lg text-gray-300 max-w-xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 1 }}
				>
					Connect your wallet and explore the future of decentralized apps with
					RainbowKit, Wagmi, and Next.js.
				</motion.p>

				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 1, type: "spring" }}
					onMouseEnter={() => setCursorVariant("hover")}
					onMouseLeave={() => setCursorVariant("default")}
				>
					<ConnectButton />
				</motion.div>
			</section>

			{/* Features Section */}
			<section className="grid md:grid-cols-3 gap-8 px-10 py-20">
				{[
					{
						title: "Secure Wallets",
						desc: "Connect safely with multiple wallets.",
					},
					{
						title: "Fast Transactions",
						desc: "Experience blazing fast Polygon network.",
					},
					{
						title: "Web3 Ready",
						desc: "Built with Next.js, Wagmi & RainbowKit.",
					},
				].map((feature, i) => (
					<motion.div
						key={i}
						className="p-6 bg-gray-800 rounded-2xl shadow-xl hover:bg-purple-700 cursor-pointer transition-colors"
						whileHover={{ scale: 1.05, rotate: 1 }}
						whileTap={{ scale: 0.95 }}
						onMouseEnter={() => setCursorVariant("hover")}
						onMouseLeave={() => setCursorVariant("default")}
					>
						<h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
						<p className="text-gray-300">{feature.desc}</p>
					</motion.div>
				))}
			</section>
		</div>
	);
}
