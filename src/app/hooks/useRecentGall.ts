"use client";

import { useEffect, useState } from "react";
import type { RecentGall } from "@/app/lib/definition";

const STORAGE_KEY = "recent-gall";
const MAX_RECENT_GALL = 10;

const isRecentGall = (maybe: unknown): maybe is RecentGall => {
  if (typeof maybe !== "object" || maybe === null) return false;

  const obj = maybe as Record<string, unknown>;
  return (
    typeof obj.abbr === "string" &&
    typeof obj.name === "string" &&
    typeof obj.href === "string"
  );
};

export function useRecentGall() {
  const [recentGall, setRecentGall] = useState<RecentGall[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        const valid = parsed.filter(isRecentGall);
        setRecentGall(valid);
      }
    } catch (err) {
      console.error("최근 갤러리 파싱 실패:", err);
    }
  }, []);

  const addRecentGall = (newItem: RecentGall) => {
    setRecentGall((prev) => {
      const filtered = prev.filter((item) => item.abbr !== newItem.abbr);
      const updated = [newItem, ...filtered].slice(0, MAX_RECENT_GALL);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeRecentGall = (abbr: string) => {
    setRecentGall((prev) => {
      const updated = prev.filter((item) => item.abbr !== abbr);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recentGall, addRecentGall, removeRecentGall };
}
