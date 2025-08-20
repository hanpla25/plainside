import { useEffect, useState } from "react";

// --- 상수 ---
import { MAX_RECENT, STORAGE_KEY } from "../constants/recent-gall-constants";

// --- 타입 ---
import { Gall } from "../lib/definitions";

const isGall = (item: any): item is Gall => {
  return (
    item &&
    typeof item === "object" &&
    typeof item.abbr === "string" &&
    typeof item.name === "string"
  );
};

export default function useRecentGall() {
  const [recentGalls, setRecentGalls] = useState<Gall[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed) && parsed.every(isGall)) {
          setRecentGalls(parsed);
        } else {
          setRecentGalls([]);
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error(error);
        setRecentGalls([]);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addRecentGall = (abbr: string, name: string) => {
    if (!abbr || !name) return;

    setRecentGalls((prev) => {
      let updated = prev.filter((g) => g.abbr !== abbr);

      updated.unshift({ abbr, name });
      if (updated.length > MAX_RECENT) updated = updated.slice(0, MAX_RECENT);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  const deleteAllRecentGall = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentGalls([]);
  };

  return { recentGalls, addRecentGall, deleteAllRecentGall };
}
