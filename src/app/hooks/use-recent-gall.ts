import { useEffect, useState } from "react";

// --- Types ---
import { GallMeta } from "../lib/definitions";

// --- Constants ---
import { MAX_RECENT, STORAGE_KEY } from "../constants/recent-gall-constants";

const isValidGallMetaArray = (data: unknown): data is GallMeta[] =>
  Array.isArray(data) &&
  data.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof item.name === "string" &&
      typeof item.abbr === "string"
  );

export default function useRecentGall() {
  const [recentGall, setRecentGall] = useState<GallMeta[]>([]);

  const addRecentGall = (newItem: GallMeta) => {
    const storedItem = localStorage.getItem(STORAGE_KEY);
    let list: GallMeta[] = [];

    if (storedItem) {
      try {
        const parsed = JSON.parse(storedItem);
        if (isValidGallMetaArray(parsed)) {
          list = parsed;
        }
      } catch {
        return;
      }
    }

    list = list.filter((item) => item.abbr !== newItem.abbr);
    list.unshift(newItem);
    list = list.slice(0, MAX_RECENT);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setRecentGall(list);
  };

  const removeRecentGall = (abbr: string) => {
    const updated = recentGall.filter((item) => item.abbr !== abbr);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setRecentGall(updated);
  };

  useEffect(() => {
    const storedItem = localStorage.getItem(STORAGE_KEY);
    if (!storedItem) return;

    try {
      const parsed = JSON.parse(storedItem);
      if (isValidGallMetaArray(parsed)) {
        setRecentGall(parsed);
      }
    } catch {
      console.warn("유효하지 않은 로컬스토리지 데이터");
    }
  }, []);

  return { recentGall, addRecentGall, removeRecentGall };
}
