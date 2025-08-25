import "./globals.css";
import type { Metadata } from "next";
import Providers from "../components/Providers";
import { Poppins } from "next/font/google"; // ✅ import font

// ✅ Load Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RainbowKit + Next.js",
  description: "Connect multiple wallets with RainbowKit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ✅ apply font ke body */}
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
