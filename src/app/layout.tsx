import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { NavBar, ReactQueryProvider } from "@/components";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "NetCap – Movie Streaming Platform",
		template: "%s | NetCap",
	},
	description:
		"Stream your favorite movies and shows with NetCap, a Netflix-inspired clone built with Next.js.",
	openGraph: {
		title: "NetCap – Movie Streaming Platform",
		description:
			"Stream your favorite movies and shows with NetCap, a Netflix-inspired clone built with Next.js.",
		url: "https://yourdomain.com",
		siteName: "NetCap",
		images: [
			{
				url: "https://yourdomain.com/og-default.png",
				width: 1200,
				height: 630,
				alt: "NetCap Movie Streaming",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "NetCap – Movie Streaming Platform",
		description:
			"Your favorite movies and shows, streaming with Next.js power.",
		images: ["https://yourdomain.com/og-default.png"],
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased relative scrollbar-hide scroll-smooth`}
			>
				<ReactQueryProvider>
					<NextIntlClientProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<NavBar />
							{children}
						</ThemeProvider>
					</NextIntlClientProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
