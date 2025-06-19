// hooks/useRecentGall.ts

"use client";

import { useEffect, useState } from "react";
import type { RecentGall } from "@/app/lib/definition";

const STORAGE_KEY = "recent-gall";

function isRecentGall(obj: unknown): obj is RecentGall {
  if (typeof obj !== "object" || obj === null) return false;

  const maybe = obj as Record<string, unknown>;

  return (
    typeof maybe.abbr === "string" &&
    typeof maybe.name === "string" &&
    typeof maybe.href === "string"
  );
}

function getLocalRecent(): RecentGall[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRecentGall);
  } catch (e) {
    console.error("최근 방문 갤러리 로드 실패:", e);
    return [];
  }
}

function removeFromLocal(abbr: string): RecentGall[] {
  const current = getLocalRecent();
  const updated = current.filter((item) => item.abbr !== abbr);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function useRecentGall() {
  const [data, setData] = useState<RecentGall[]>([]);

  useEffect(() => {
    setData(getLocalRecent());
  }, []);

  const remove = (abbr: string) => {
    const updated = removeFromLocal(abbr);
    setData(updated);
  };

  const add = (newItem: RecentGall) => {
    const current = getLocalRecent();
    const updated = [
      newItem,
      ...current.filter((item) => item.abbr !== newItem.abbr),
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setData(updated);
  };

  const reload = () => {
    setData(getLocalRecent());
  };

  return { data, add, remove, reload };
}
