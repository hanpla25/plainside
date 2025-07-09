"use client";

import useRecentGall from "@/app/hooks/useRecentGall";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RecentGallHeader from "./RecentGallHeader";
import RecentGallList from "./RecentGallList";
import RecentGallModify from "./RecentGallModify";

type GallMeta = {
  abbr: string;
  name: string;
};

type Props = {
  gallList: GallMeta[];
};

export default function RecentGall({ gallList }: Props) {
  const [isModify, setIsModify] = useState(false);
  const { recentGall, addRecentGall, removeRecentGall, clearAll } =
    useRecentGall();
  const { abbr } = useParams();

  const gall = gallList.find((g) => g.abbr === abbr);

  useEffect(() => {
    if (gall) {
      addRecentGall({ abbr: gall.abbr, name: gall.name });
    }
  }, [gall]);

  useEffect(() => {
    if (recentGall.length === 0 && isModify) {
      setIsModify(false);
    }
  }, [recentGall, isModify]);

  return (
    <div className="px-2 lg:px-0 py-2">
      <RecentGallHeader setIsModify={setIsModify} recentGall={recentGall} />
      <RecentGallList
        recentGall={recentGall}
        isModify={isModify}
        removeRecentGall={removeRecentGall}
      />
      {isModify && <RecentGallModify clearAll={clearAll} />}
    </div>
  );
}
