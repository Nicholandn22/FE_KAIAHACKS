import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // ⬅️ pakai Poppins
import Header from "@/components/header";
import Footer from "@/components/footer";
import ClientLayout from "@/components/ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // atur weight sesuai kebutuhan
});

export const metadata: Metadata = {
  title: "Stablecoins Sandwich",
  description: "Swap stablecoin ke rupiah langsung ke rekening",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black text-white relative`}>
        <ClientLayout>
          <Header />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
