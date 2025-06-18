"use client";

import { setRecentGalleries } from "@/app/hooks/useRecentGallery";
import { useEffect } from "react";

type Props = {
  recentVisitData: RecentGallery;
  gallName: string;
};

export default function RecentGallerySaver({
  recentVisitData,
  gallName,
}: Props) {
  useEffect(() => {
    if (!gallName) {
      return;
    }
    setRecentGalleries(recentVisitData);
  }, [recentVisitData]);

  return null;
}
