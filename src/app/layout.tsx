import type { Metadata } from "next";

// --- 데이터 요청 ---
import { getUserToken } from "./lib/data/user-data";

// --- UI ---
import Header from "./ui/header";
import RightItems from "./ui/right-items/RightItems";
import RecentGall from "./ui/recent-gall";
import { fetchGallListData } from "./lib/data/gall-data";

// --- 스타일 ---
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

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
  const [userToken, popularGallData, newestGallData, allGallData] =
    await Promise.all([
      getUserToken(),
      fetchGallListData("popular", 5),
      fetchGallListData("newest", 5),
      fetchGallListData(),
    ]);

  const isLogin = userToken ? true : false;

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-800 max-w-5xl mx-auto`}
      >
        <Header isLogin={isLogin} />
        <RecentGall allGallData={allGallData} />
        {/* 메인 */}
        <div className="lg:flex gap-8 mb-30">
          {/* 왼쪽 */}
          <main className="lg:basis-3/4">{children}</main>

          {/* 오른쪽 */}
          <aside className="lg:basis-1/4 hidden lg:flex flex-col gap-16 px-4">
            <RightItems
              popularGallData={popularGallData}
              newestGallData={newestGallData}
            />
          </aside>
        </div>
      </body>
    </html>
  );
}
