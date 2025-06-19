"use client";

import { useEffect } from "react";
import type { RecentGall } from "@/app/lib/definition";
import { useRecentGall } from "@/app/hooks/useGetRecentGall";

type Props = {
  recentGalleryData: RecentGall;
  gallName: string;
};

export default function RecentGallerySaver({
  recentGalleryData,
  gallName,
}: Props) {
  const { add } = useRecentGall();

  useEffect(() => {
    if (!gallName) return;
    add(recentGalleryData);
  }, [gallName, recentGalleryData]);

  return null;
}
