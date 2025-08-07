import type { Metadata } from "next";

// --- Styles ---
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

// --- UI ---
import Header from "./ui/layout/header";
import RecentGall from "./ui/layout/recent-gall";

// --- Data ---
import { fetchGallListNameAbbr } from "./lib/data/gall-data";
import { getUserFromToken } from "./lib/data/user-data";
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
  const user = await getUserFromToken();
  const isLogin = user ? true : false;

  const [gallNameList, popularGallNameList, newestGallNameList] =
    await Promise.all([
      fetchGallListNameAbbr({}),
      fetchGallListNameAbbr({ sort: "popular", size: 5 }),
      fetchGallListNameAbbr({ sort: "newest", size: 5 }),
    ]);

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-800 max-w-5xl mx-auto`}
      >
        {/* 헤더 */}
        <Header isLogin={isLogin} gallList={gallNameList} />

        {/* 최근 갤러리 */}
        <RecentGall gallList={gallNameList} />

        {/* 메인 */}
        <div className="lg:flex gap-8 mb-30">
          {/* 왼쪽 */}
          <main className="lg:basis-3/4">{children}</main>

          {/* 오른쪽 */}
          <aside className="lg:basis-1/4 hidden lg:flex flex-col gap-16 px-4">
            <RightItems
              user={user}
              popularGallNameList={popularGallNameList}
              newestGallNameList={newestGallNameList}
            />
          </aside>
        </div>
      </body>
    </html>
  );
}
