"use client";

import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const currenciesFrom = ["USDT", "USDC", "DAI", "BUSD"];
  const currenciesTo = ["IDRX", "ETH", "BTC", "DAI"];

  const [from, setFrom] = useState("USDT");
  const [to, setTo] = useState("IDRX");
  const [amount, setAmount] = useState<number>(500);
  const [predicted, setPredicted] = useState(0);
  const [fee, setFee] = useState(0);
  const [rate, setRate] = useState(0);
  const [duration, setDuration] = useState("2 minutes");

  // Dummy saldo wallet per token
  const walletBalances: Record<string, number> = {
    USDT: 1200,
    USDC: 850,
    DAI: 500,
    BUSD: 300,
  };

  useEffect(() => {
    const rates: Record<string, number> = {
      IDRX: 66.4544,
      ETH: 0.0003,
      BTC: 0.00002,
      DAI: 1,
    };
    const conversionRate = rates[to] || 1;
    setPredicted(amount * conversionRate);

    setFee(amount * 0.003);
    setRate(conversionRate);

    setDuration(
      to === "IDRX" ? "2 minutes" : to === "ETH" ? "15 minutes" : "1 minute"
    );
  }, [amount, to]);

  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-lg p-8 bg-gray-950/80 rounded-2xl shadow-xl space-y-6 text-gray-100">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold mb-2">Demo Swap</h1>
          <p className="text-lg text-gray-400">
            Easily convert your crypto in seconds
          </p>
        </div>

        {/* Input nominal dan currency */}
        <div className="space-y-2">
          <label className="text-md font-semibold text-gray-200">
            You send
          </label>
          <div className="flex items-center border-2 bg-gray-950/80 rounded-xl overflow-hidden bg-gray-950/80 text-gray-100">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1 p-4 text-xl font-semibold outline-none bg-gray-950/80"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="p-4 border-l-2 bg-gray-950/80 bg-gray-950/80 text-xl font-semibold appearance-none"
            >
              {currenciesFrom.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* Saldo Wallet */}
          <p className="text-sm text-gray-400 mt-1">
            Saldo: {walletBalances[from].toLocaleString()} {from}
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-md font-semibold text-gray-200">
            Recipient gets
          </label>
          <div className="flex items-center border-2 bg-gray-950/80 rounded-xl overflow-hidden bg-gray-950/80 text-gray-100">
            <input
              type="text"
              value={predicted.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
              readOnly
              className="flex-1 p-4 text-xl font-semibold outline-none bg-gray-950/80"
            />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="p-4 border-l-2 bg-gray-950/80 bg-gray-950/80 text-xl font-semibold appearance-none"
            >
              {currenciesTo.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fee, rate, duration */}
        <div className="text-md text-gray-400 space-y-2">
          <div className="flex justify-between">
            <span>Fee:</span>
            <span>
              {fee.toFixed(2)} {from}, incl.
            </span>
          </div>
          <div className="flex justify-between">
            <span>Today's rate:</span>
            <span>
              1 {from} = {rate} {to}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Should arrive:</span>
            <span>Within {duration}</span>
          </div>
        </div>

        {/* Tombol */}
        <button className="w-full py-5 mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xl transition-all shadow-lg">
          Swap
        </button>
      </div>
    </div>
  );
}
