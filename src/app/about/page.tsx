"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="py-20 px-6">
      <Header />

      <div className="max-w-3xl mx-auto bg-black/80 p-10 rounded-xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-pink-400 text-center mb-12">
          Tentang Stablecoins Sandwich
        </h1>

        <div className="text-gray-300 space-y-6">
          <p>
            Visi kami adalah membuat stablecoin lebih dekat ke rupiah dengan
            alur yang simpel, transparan, dan langsung masuk ke rekening bank.
          </p>

          <h2 className="text-2xl font-bold text-purple-400">Roadmap</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Phase 1: UI/Front-end demo</li>
            <li>Phase 2: Integrasi MetaMask & Swap</li>
            <li>Phase 3: Integrasi API IDRX</li>
            <li>Phase 4: Produk Beta</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
