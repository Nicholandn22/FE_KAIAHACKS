"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function SwapCard() {
	const { isConnected, address } = useAccount();

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
			<div className="mb-4">
				<ConnectButton />
			</div>

			{isConnected ? (
				<>
					<p className="text-sm text-gray-600">Connected: {address}</p>
					<div className="mt-4">
						{/* UI untuk swap token */}
						<input
							type="number"
							placeholder="Amount USDC"
							className="w-full p-2 border rounded mb-2"
						/>
						<button className="w-full bg-blue-500 text-white py-2 rounded">
							Swap to IDRX
						</button>
					</div>
				</>
			) : (
				<p className="text-gray-500 text-sm">Please connect your wallet</p>
			)}
		</div>
	);
}
