"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// --- 타입 ---
import { Gall } from "@/app/lib/definitions";

// --- hooks ---
import useRecentGall from "@/app/hooks/useRecentGall";

// --- UI ---
import HeaderText from "../common/HeaderText";

type Props = {
  allGallData: Gall[];
};

const List = ({ recentGall }: { recentGall: Gall[] }) => (
  <div className="flex flex-wrap gap-2 px-3 lg:px-0">
    {recentGall.map((item) => (
      <Link
        key={item.abbr}
        href={`/${item.abbr}`}
        className="px-3 py-1 text-sm rounded-full bg-neutral-100 text-neutral-700"
      >
        {item.name}
      </Link>
    ))}
  </div>
);

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
  <button
    onClick={onDelete}
    className="text-xs text-neutral-600 cursor-pointer hover:text-red-500 mb-2"
  >
    전체삭제
  </button>
);

export default function RecentGall({ allGallData }: Props) {
  const { abbr } = useParams();
  const { recentGalls, addRecentGall, deleteAllRecentGall } = useRecentGall();

  useEffect(() => {
    const gallName = allGallData.find((item) => item.abbr === abbr)?.name;
    if (!gallName) return;

    addRecentGall(abbr as string, gallName);
  }, [abbr]);

  return (
    <>
      {recentGalls.length > 0 && (
        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <HeaderText text="최근 갤러리" />
            <DeleteButton onDelete={deleteAllRecentGall} />
          </div>
          <List recentGall={recentGalls} />
        </div>
      )}
    </>
  );
}
