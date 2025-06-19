"use client";

import { useRecentGall } from "@/app/hooks/useGetRecentGall";
import RecentGallItem from "./recent-gall-item";
import RecentGallList from "./recent-gall-list";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const spanStyle = "text-sm font-bold";
const MAX_RECENT_GALL = 10;

export default function RecentGall() {
  const { data: recentGallData, remove, reload } = useRecentGall();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    setMounted(true);
  }, [pathname]);

  useEffect(() => {
    if (mounted) {
      reload();
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div className="flex p-2 bg-neutral-100 gap-2 items-center">
        <span className={spanStyle}>최근방문</span>
        <ul className="flex flex-1 gap-4 overflow-hidden">
          {recentGallData.slice(0, MAX_RECENT_GALL).map((item) => (
            <RecentGallItem key={item.abbr} {...item} onRemove={remove} />
          ))}
        </ul>
        <button
          className={spanStyle + " hover:underline"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          전체보기
        </button>
      </div>
      {isOpen && (
        <RecentGallList recentGallData={recentGallData} onRemove={remove} />
      )}
    </>
  );
}
