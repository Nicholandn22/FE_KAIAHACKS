"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="py-20 px-6">
      <Header />

      <div className="max-w-3xl mx-auto bg-black/80 p-10 rounded-xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-pink-400 text-center mb-12">
          About Our Stablecoins Sandwich
        </h1>

        <div className="text-gray-300 space-y-6">
          <p>
            Our vision is to make a stablcoin that is close to the value of the Indonesia Rupiah
            with a simple flow, transparant and connected directly to bank account.
          <h2 className="text-2xl font-bold text-purple-400">Roadmap</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Phase 1: UI/Front-end demo</li>
            <li>Phase 2: MetaMask & Swap Integration</li>
            <li>Phase 3: API IDRX Integration</li>
            <li>Phase 4: Beta Product </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
