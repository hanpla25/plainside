import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import getLayoutData from "./lib/data/layout-data";
import Header from "./ui/layout/header";
import RecentGall from "./ui/layout/recent-gall";
import RightItems from "./ui/layout/right-items";

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
  const { user, gallMeta, newestGallMeta, popularGallMeta } =
    await getLayoutData();

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-800 max-w-5xl mx-auto`}
      >
        <Header user={user} gallList={gallMeta} />
        <RecentGall gallList={gallMeta} />
        <div className="lg:flex gap-8 mb-30">
          <div className="lg:basis-3/4">{children}</div>
          <div className="lg:basis-1/4 hidden lg:flex flex-col gap-16 px-4">
            <RightItems
              user={user}
              newestGallMeta={newestGallMeta}
              popularGallMeta={popularGallMeta}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
