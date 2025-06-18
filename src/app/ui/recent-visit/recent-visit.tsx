// recent-visit.tsx

"use client";

import { useState } from "react";
import RecentVisitItem from "./recent-visit-item";
import { useSwipeableControl } from "@/app/hooks/useSwipeableControl";

const ITEMS_PER_PAGE = 6;

export function RecentVisit({ recentVisit }: { recentVisit: RecentGallery[] }) {
  return (
    <ul className="hidden p-2 space-x-2 lg:flex flex-wrap">
      {recentVisit.map((item, i) => (
        <RecentVisitItem href={item.href} name={item.name} key={i} />
      ))}
    </ul>
  );
}

export function MobileRecentVisit({
  recentVisit,
}: {
  recentVisit: RecentGallery[];
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(recentVisit.length / ITEMS_PER_PAGE);
  const startIdx = currentPage * ITEMS_PER_PAGE;
  const currentItems = recentVisit.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const swipeHandlers = useSwipeableControl({
    onSwipeLeft: () => {
      if (currentPage < totalPages - 1) setCurrentPage((p) => p + 1);
    },
    onSwipeRight: () => {
      if (currentPage > 0) setCurrentPage((p) => p - 1);
    },
  });

  return (
    <div
      className="bg-white border border-gray-300 shadow-lg z-10 w-full"
      {...swipeHandlers}
    >
      <ul className="grid grid-cols-2 grid-rows-3 gap-2 text-sm text-gray-700 p-2">
        {currentItems.map((item, i) => (
          <RecentVisitItem href={item.href} name={item.name} key={i} />
        ))}
      </ul>

      <div className="flex justify-center gap-1 pb-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentPage ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
