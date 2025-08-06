// --- Constants ---
import { BEST_ABBR } from "@/app/constants/href-constants";

// --- Utils ---
import formatDate from "@/app/utils/format-date";

// --- Icons ---
import { Eye, ThumbsUp } from "lucide-react";

type Props = {
  abbr: string;
  gallName: string;
  userName: string;
  ipAddress: string;
  isLogin: boolean;
  createdAt: string;
  viewCount: number;
  likeCount: number;
};

export default function GallPostListInfo({
  abbr,
  gallName,
  userName,
  ipAddress,
  isLogin,
  createdAt,
  viewCount,
  likeCount,
}: Props) {
  return (
    <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-3 items-center">
      <span>
        {userName}
        {!isLogin && ` ${ipAddress}`}
      </span>

      <span>
        {formatDate(createdAt, `${abbr === "best" ? "relative" : "time"}`)}
      </span>

      <span className="flex items-center gap-1">
        <Eye size={14} />
        {viewCount}
      </span>

      <span className="flex items-center gap-1">
        <ThumbsUp size={14} />
        {likeCount}
      </span>

      {abbr === BEST_ABBR && <span>{gallName}</span>}
    </div>
  );
}
