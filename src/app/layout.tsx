import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./ui/header/header";
import { fetchGalleries } from "./lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "플레인사이드",
  description: "자유로운 커뮤니티",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const galleryData = await fetchGalleries();
  
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-900 max-w-6xl mx-auto`}
      >
        <div className="min-h-[100vh]">
          <Header galleryData={galleryData} />
          {children}
        </div>
      </body>
    </html>
  );
}
