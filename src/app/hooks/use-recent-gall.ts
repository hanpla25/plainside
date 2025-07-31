import { useEffect, useState } from "react";
import { GallMeta } from "../lib/definitions";

const STORAGE_KEY = "recent-gall";
const MAX_RECENT = 6;

export default function useRecentGall() {
  const [recentGall, setRecentGall] = useState<GallMeta[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (isValid(parsed)) {
        setRecentGall(parsed);
      } else {
        console.warn("유효하지 않은 최근 방문 데이터:", parsed);
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("로컬스토리지 파싱 실패:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function addRecentGall(newGall: GallMeta) {
    setRecentGall((prev) => {
      const filtered = prev.filter((g) => g.abbr !== newGall.abbr);
      const updated = [newGall, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function removeRecentGall(abbr: string) {
    setRecentGall((prev) => {
      const updated = prev.filter((gall) => gall.abbr !== abbr);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
    setRecentGall([]);
  }

  return { recentGall, addRecentGall, removeRecentGall, clearAll };
}

function isValid(data: unknown): data is GallMeta[] {
  if (!Array.isArray(data)) return false;

  return data.every((item) => {
    if (typeof item === "object" && item !== null) {
      const obj = item as Record<string, unknown>;
      return typeof obj.abbr === "string" && typeof obj.name === "string";
    }
    return false;
  });
}
