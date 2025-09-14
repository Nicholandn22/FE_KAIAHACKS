"use client";

export default function DocsPage() {
  return (
    <div className="py-20 px-6">
      {/* Card konten termasuk judul */}
      <div className="max-w-4xl mx-auto bg-gray-950/80 backdrop-blur-md p-10 rounded-xl text-white space-y-12">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-400 text-center mb-8">
          Integrasi & Dokumentasi
        </h1>

        <section>
          <h2 className="text-2xl font-bold mb-4"> MetaMask Integration</h2>
          <p className="text-gray-300">
            Gunakan MetaMask untuk connect wallet & baca saldo stablecoin.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            DEX Swap (Uniswap on KAIA)
          </h2>
          <p className="text-gray-300">
            Swap USDT → IDRX menggunakan Uniswap di blockchain KAIA.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4"> API IDRX</h2>
          <p className="text-gray-300">
            Withdraw IDRX langsung ke rekening bank pengguna.
          </p>
        </section>
      </div>
    </div>
  );
}
