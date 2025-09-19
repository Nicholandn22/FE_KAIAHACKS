"use client";

import { use, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x384883d49802980b36181643Ee293743cD66cc7e";

const ABI = ["function claim() external"];

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask tidak ditemukan!");
        return;
      }

      // ethers v5 pakai Web3Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const network = await provider.getNetwork();
      if (network.chainId !== 80002) {
        alert("Tolong switch ke Polygon Amoy testnet (chainId 80002)");
        return;
      }

      setAccount(address);
    } catch (err: any) {
      console.error(err);
      alert("Gagal connect wallet");
    }
  };

  const claimToken = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      setStatus("Processing...");
      const tx = await contract.claim();
      await tx.wait();
      setStatus("✅ Claim sukses!");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Claim gagal: " + (err.message || err));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connected: {account}</p>
          <button
            onClick={claimToken}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Claim 50 USDC + 50 IDRX
          </button>
          {status && <p>{status}</p>}
        </>
      )}
    </main>
  );
}
