"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Gallery, RecentGall } from "@/app/lib/definition";
import RecentGallItem from "./recent-gall-item";
import RecentGallList from "./recent-gall-list";
import { useRecentGall } from "@/app/hooks/useRecentGall";

const spanStyle = "text-sm font-bold";
const MAX_RECENT_GALL = 10;

export default function RecentGall({
  galleryData,
}: {
  galleryData: Gallery[];
}) {
  const { abbr } = useParams();
  const { recentGall, addRecentGall, removeRecentGall } = useRecentGall();
  const [isOpen, setIsOpen] = useState(false);

  const gall =
    typeof abbr === "string" ? galleryData.find((g) => g.abbr === abbr) : null;

  useEffect(() => {
    if (!gall || typeof abbr !== "string") return;

    const newItem: RecentGall = {
      abbr,
      name: gall.gall_name,
      href: `/gallery/${abbr}`,
    };

    addRecentGall(newItem);
  }, [abbr, gall]);

  return (
    <>
      <div className="flex p-2 bg-neutral-100 gap-2 items-center">
        <span className={spanStyle}>최근방문</span>
        <ul className="flex flex-1 gap-4 overflow-x-auto scrollbar-hide lg:overflow-hidden">
          {recentGall.slice(0, MAX_RECENT_GALL).map((item) => (
            <RecentGallItem
              key={item.abbr}
              {...item}
              onRemove={removeRecentGall}
            />
          ))}
        </ul>
        <button
          className={`${spanStyle} hover:underline cursor-pointer`}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          전체보기
        </button>
      </div>
      {isOpen && (
        <RecentGallList recentGall={recentGall} onRemove={removeRecentGall} />
      )}
    </>
  );
}
