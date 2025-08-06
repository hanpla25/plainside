"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";

// --- Types ---
import { GallMeta } from "@/app/lib/definitions";

// --- Hooks ---
import useRecentGall from "@/app/hooks/use-recent-gall";

// --- UI ---
import RecentGallList from "./RecentGallList";

export default function RecentGall({ gallList }: { gallList: GallMeta[] }) {
  const { abbr } = useParams();
  const gall = gallList.find((g) => g.abbr === abbr);

  const { recentGall, addRecentGall, removeRecentGall } = useRecentGall();

  useEffect(() => {
    if (gall) {
      addRecentGall(gall);
    }
  }, [abbr]);

  if (gallList)
    return (
      <RecentGallList
        recentGallList={recentGall}
        removeRecentGall={removeRecentGall}
      />
    );
}
