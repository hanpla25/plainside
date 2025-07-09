import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./ui/header";
import RecentGall from "./ui/recent-gall";
import { getLayoutData } from "./lib/layout-data";
import RightItems from "./ui/right-items";

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
}: Readonly<{ children: React.ReactNode }>) {
  const { user, gallList, popularGallList, gallMeta } = await getLayoutData();
  const isLogin = !!user;

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-900 max-w-5xl mx-auto`}
      >
        <Header isLogin={isLogin} gallList={gallList} />
        <RecentGall gallList={gallMeta} />
        <div className="lg:flex gap-8">
          <div className="lg:basis-3/4">{children}</div>
          <RightItems
            user={user}
            gallList={gallList}
            popularGallData={popularGallList}
            isLogin={isLogin}
          />
        </div>
      </body>
    </html>
  );
}
