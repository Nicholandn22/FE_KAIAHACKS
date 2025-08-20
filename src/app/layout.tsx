import "./globals.css";
import type { Metadata } from "next";
import Providers from "../components/Providers";

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
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
