"use client";

import { GallMeta } from "@/app/lib/definitions";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RecentGallHeader from "./RecentGallHeader";
import RecentGallList from "./RecentGallList";
import ClearAllButton from "./ClearAllButton ";
import useRecentGall from "@/app/hooks/use-recent-gall";

type Props = {
  gallList: GallMeta[];
};

export default function RecentGall({ gallList }: Props) {
  const pathname = usePathname();
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
    if (recentGall.length === 0) {
      setIsModify(false);
    }
  }, [recentGall]);

  useEffect(() => {
    setIsModify(false);
  }, [pathname]);

  return (
    <div className="px-2 lg:px-0 py-2">
      <RecentGallHeader setIsModify={setIsModify} recentGall={recentGall} />
      <RecentGallList
        recentGall={recentGall}
        isModify={isModify}
        removeRecentGall={removeRecentGall}
      />
      {isModify && <ClearAllButton clearAll={clearAll} />}
    </div>
  );
}
