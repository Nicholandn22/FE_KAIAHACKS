"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// ----- Kontrak di Testnet Amoy -----
const SIMPLE_SWAP_ADDRESS = "0xdc11b97b8db946ba774c3fffbca5184dc95e8386";
const IDRX_ADDRESS = "0x4FbFCBd46cAADA31F360985BC874744D8F372e79";
const USDC_ADDRESS = "0xEAb473b4Fb2Efbb4baf819104E52f835ACB4D124";
// -----------------------------------

const ERC20_ABI = [
	"function decimals() view returns (uint8)",
	"function allowance(address owner, address spender) view returns (uint256)",
	"function approve(address spender, uint256 amount) returns (bool)",
];

const SIMPLE_SWAP_ABI = [
	"function swapIDRXtoUSDC(uint256 amountIDRX)",
	"function swapUSDCtoIDRX(uint256 amountUSDC)",
];

// Polygon Amoy config
const POLYGON_AMOY = {
	chainId: "0x13882", // 80002 dalam hex
	chainName: "Polygon Amoy Testnet",
	nativeCurrency: {
		name: "MATIC",
		symbol: "MATIC",
		decimals: 18,
	},
	rpcUrls: ["https://rpc-amoy.polygon.technology/"],
	blockExplorerUrls: ["https://www.oklink.com/amoy"],
};

export default function SimpleSwapDemo() {
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [account, setAccount] = useState("");
	const [network, setNetwork] = useState(null);

	const [idrxDecimals, setIdrxDecimals] = useState(18);
	const [usdcDecimals, setUsdcDecimals] = useState(6);

	const [direction, setDirection] = useState("IDRXtoUSDC");
	const [inputAmount, setInputAmount] = useState("");
	const [estimatedOut, setEstimatedOut] = useState("0");

	const [allowance, setAllowance] = useState(ethers.BigNumber.from(0));
	const [isApproving, setIsApproving] = useState(false);
	const [isSwapping, setIsSwapping] = useState(false);
	const [txHash, setTxHash] = useState("");

	const [notification, setNotification] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	// 🔹 Cek koneksi awal dan paksa ke Polygon Amoy
	useEffect(() => {
		if (typeof window === "undefined") return;
		if (!window.ethereum) return;

		const p = new ethers.providers.Web3Provider(window.ethereum, "any");
		setProvider(p);

		async function init() {
			const net = await p.getNetwork();
			setNetwork(net);

			// Jika bukan Amoy → paksa switch
			if (net.chainId !== 80002) {
				await switchToPolygonAmoy();
			}

			const accs = await p.listAccounts();
			if (accs && accs[0]) {
				setAccount(accs[0]);
				setSigner(p.getSigner());
			}
		}
		init();

		window.ethereum.on("accountsChanged", (accounts) => {
			setAccount(accounts[0] || "");
			if (accounts[0]) setSigner(p.getSigner());
		});

		window.ethereum.on("chainChanged", async () => {
			window.location.reload();
		});
	}, []);

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification(null);
			}, 5000); // auto close 5 detik
			return () => clearTimeout(timer);
		}
	}, [notification]);

	async function switchToPolygonAmoy() {
		try {
			await window.ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: POLYGON_AMOY.chainId }],
			});
		} catch (switchError) {
			if (switchError.code === 4902) {
				await window.ethereum.request({
					method: "wallet_addEthereumChain",
					params: [POLYGON_AMOY],
				});
			}
		}
	}

	async function connectWallet() {
		if (!window.ethereum)
			// return alert("No Web3 wallet found. Install MetaMask.");
			setNotification({
				type: "error",
				message: "No Web3 wallet found. Install MetaMask.",
			});

		try {
			const p = new ethers.providers.Web3Provider(window.ethereum, "any");
			await p.send("eth_requestAccounts", []);
			setProvider(p);
			const s = p.getSigner();
			setSigner(s);
			const addr = await s.getAddress();
			setAccount(addr);
			const net = await p.getNetwork();
			setNetwork(net);

			if (net.chainId !== 80002) {
				await switchToPolygonAmoy();
			}
		} catch (e) {
			console.error("connectWallet error", e);
			// alert("Gagal connect wallet: " + (e && e.message ? e.message : e));
			setNotification({ type: "error", message: "Gagal connect wallet: " });
		}
	}

	// fetch decimals
	useEffect(() => {
		if (!provider) return;
		const idrx = new ethers.Contract(IDRX_ADDRESS, ERC20_ABI, provider);
		const usdc = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, provider);

		async function f() {
			try {
				const [d1, d2] = await Promise.all([
					idrx.decimals().catch(() => 18),
					usdc.decimals().catch(() => 6),
				]);
				setIdrxDecimals(Number(d1));
				setUsdcDecimals(Number(d2));
			} catch (e) {
				console.error("fetch decimals error", e);
			}
		}
		f();
	}, [provider]);

	// estimate output 1:1
	useEffect(() => {
		if (!inputAmount || inputAmount === "") {
			setEstimatedOut("0");
			return;
		}
		setEstimatedOut(inputAmount);
	}, [inputAmount, direction]);

	// refresh allowance
	useEffect(() => {
		if (!provider || !account) return;
		const tokenAddr = direction === "IDRXtoUSDC" ? IDRX_ADDRESS : USDC_ADDRESS;
		const token = new ethers.Contract(tokenAddr, ERC20_ABI, provider);
		async function f() {
			try {
				const alw = await token.allowance(account, SIMPLE_SWAP_ADDRESS);
				setAllowance(ethers.BigNumber.from(alw));
			} catch (e) {
				console.error("allowance fetch error", e);
			}
		}
		f();
	}, [provider, account, direction, inputAmount]);

	async function approveIfNeeded(onChainIn) {
		const tokenAddr = direction === "IDRXtoUSDC" ? IDRX_ADDRESS : USDC_ADDRESS;
		try {
			if (allowance.gte(onChainIn)) return true;
			setIsApproving(true);
			const token = new ethers.Contract(tokenAddr, ERC20_ABI, signer);
			const tx = await token.approve(SIMPLE_SWAP_ADDRESS, onChainIn);
			await tx.wait();
			const newAllowance = await token.allowance(
				await signer.getAddress(),
				SIMPLE_SWAP_ADDRESS
			);
			setAllowance(ethers.BigNumber.from(newAllowance));
			setIsApproving(false);
			return true;
		} catch (e) {
			setIsApproving(false);
			console.error("approve error", e);
			// alert("Approve failed: " + (e && e.message ? e.message : e));
			setNotification({ type: "error", message: "Approve failed" });
			return false;
		}
	}

	async function doSwap() {
		if (!signer) {
			// alert("Connect wallet first");
			setNotification({ type: "error", message: "Connect wallet first" });

			return;
		}
		if (!inputAmount || inputAmount === "") {
			// alert("Enter amount to swap");
			setNotification({ type: "error", message: "Enter amount to swap" });

			return;
		}

		const decimalsIn = direction === "IDRXtoUSDC" ? idrxDecimals : usdcDecimals;
		let onChainIn;
		try {
			onChainIn = ethers.utils.parseUnits(inputAmount, decimalsIn);
		} catch (e) {
			// alert("Invalid amount format");
			setNotification({ type: "error", message: "Invalid amount format" });
			return;
		}

		const ok = await approveIfNeeded(onChainIn);
		if (!ok) return;

		try {
			setIsSwapping(true);
			const swap = new ethers.Contract(
				SIMPLE_SWAP_ADDRESS,
				SIMPLE_SWAP_ABI,
				signer
			);
			let tx;
			if (direction === "IDRXtoUSDC") {
				tx = await swap.swapIDRXtoUSDC(onChainIn);
			} else {
				tx = await swap.swapUSDCtoIDRX(onChainIn);
			}
			setTxHash(tx.hash);
			await tx.wait();
			// alert("Swap successful: " + tx.hash);
			setNotification({
				type: "success",
				message: "Swap successfully",
			});

			setIsSwapping(false);
		} catch (e) {
			setIsSwapping(false);
			console.error("swap error", e);
			// alert("Swap failed: " + (e && e.message ? e.message : e));
			setNotification({
				type: "error",
				message: "Swap failed: " + (e && e.message ? e.message : e),
			});
		}
	}

	return (
		<div className="max-w-md mx-auto mt-8 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#0b0720] via-[#1a0b2a] to-[#2b0f36] text-white">
			<h2 className="text-2xl font-bold text-center">
				Demo Swap (Polygon Amoy Testnet)
			</h2>
			<p className="text-sm text-center mt-1">
				Swap IDRX ↔ USDC — UI sederhana, rate 1:1
			</p>

			<div className="mt-4 text-xs text-gray-300">
				Connected: {account ? account : "Not connected"}
			</div>

			<div className="mt-4">
				<label className="block text-sm font-medium mb-1">You send</label>
				<div className="flex gap-3 items-center">
					<input
						className="flex-1 bg-transparent border border-white/30 rounded px-3 py-2 focus:outline-none"
						placeholder="0.0"
						value={inputAmount}
						onChange={(e) => setInputAmount(e.target.value)}
						inputMode="decimal"
					/>
					<div className="px-3 py-2 border border-white/20 rounded">
						{direction === "IDRXtoUSDC" ? "IDRX" : "USDC"}
					</div>
				</div>
			</div>

			<div className="mt-4">
				<label className="block text-sm font-medium mb-1">Recipient gets</label>
				<div className="flex gap-3 items-center">
					<div className="flex-1 bg-transparent border border-white/30 rounded px-3 py-2">
						{estimatedOut}
					</div>
					<div className="px-3 py-2 border border-white/20 rounded">
						{direction === "IDRXtoUSDC" ? "USDC" : "IDRX"}
					</div>
				</div>
			</div>

			<div className="mt-3 text-xs text-gray-300 flex justify-between items-center">
				<div>Rate (UI):</div>
				<div>1 IDRX = 1 USDC (assumed)</div>
			</div>

			<div className="mt-4 flex gap-2">
				<button
					className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500"
					onClick={() =>
						setDirection(
							direction === "IDRXtoUSDC" ? "USDCtoIDRX" : "IDRXtoUSDC"
						)
					}
				>
					Switch Direction
				</button>
				{account ? (
					<button
						className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500"
						onClick={() => {
							setAccount("");
							setSigner(null);
							setProvider(null);
						}}
					>
						Disconnect Wallet
					</button>
				) : (
					<button
						className="py-2 px-3 rounded-xl bg-gray-700 hover:bg-gray-600"
						onClick={connectWallet}
					>
						Connect Wallet
					</button>
				)}
			</div>

			<div className="mt-6">
				<button
					className={`w-full py-3 rounded-xl font-bold ${
						isSwapping || isApproving
							? "bg-gray-500"
							: "bg-pink-600 hover:brightness-110"
					}`}
					onClick={doSwap}
					disabled={isSwapping || isApproving}
				>
					{isApproving ? "Approving..." : isSwapping ? "Swapping..." : "Swap"}
				</button>
			</div>

			{txHash && (
				<div className="mt-3 text-sm text-gray-200 break-all">
					Last tx: {txHash}
				</div>
			)}

			<div className="mt-4 text-xs text-gray-400">
				<div>
					Network: {network ? `${network.name} (${network.chainId})` : "-"}
				</div>
				<div className="mt-2">
					UI paksa jaringan Polygon Amoy Testnet (80002). Jika MetaMask ada di
					jaringan lain, otomatis akan diminta pindah.
				</div>
			</div>

			{notification && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div
						className={`relative px-6 py-4 rounded-xl shadow-xl text-white max-w-sm w-full text-center
        ${notification.type === "success" ? "bg-green-600" : "bg-red-600"}`}
					>
						<button
							onClick={() => setNotification(null)}
							className="absolute top-2 right-2 text-white hover:text-gray-200"
						>
							✕
						</button>
						<p>{notification.message}</p>
					</div>
				</div>
			)}
			{notification && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div
						className={`relative px-8 py-6 rounded-2xl shadow-2xl text-white w-[400px] text-center text-lg
        ${notification.type === "success" ? "bg-green-600" : "bg-red-600"}`}
					>
						<button
							onClick={() => setNotification(null)}
							className="absolute top-3 right-3 text-white text-2xl hover:text-gray-200"
						>
							✕
						</button>
						<p className="font-semibold">{notification.message}</p>
					</div>
				</div>
			)}
		</div>
	);
}
