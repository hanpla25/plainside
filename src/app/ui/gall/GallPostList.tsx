import Link from "next/link";

// --- UI ---
import { PostList } from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";
import EmptyUi from "../common/EmptyUi";

// --- 아이콘 ---
import { Eye, ThumbsUp } from "lucide-react";

const Title = ({
  title,
  commentCount,
}: {
  title: string;
  commentCount: number;
}) => {
  return (
    <div className="flex items-center gap-2 font-medium">
      <span className="truncate">{title}</span>
      <span className="text-xs text-neutral-700 bg-neutral-200 px-1 rounded">
        {commentCount}
      </span>
    </div>
  );
};

const Info = ({
  abbr,
  gallName,
  userName,
  ipAddress,
  isLogin,
  createdAt,
  viewCount,
  likeCount,
}: {
  abbr?: string;
  gallName: string;
  userName: string;
  ipAddress: string;
  isLogin: boolean;
  createdAt: string;
  viewCount: number;
  likeCount: number;
}) => {
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

      {abbr === "best" && <span>{gallName}</span>}
    </div>
  );
};

export default function GallPostList({
  abbr,
  postList,
  queryString,
}: {
  abbr: string;
  postList: PostList[];
  queryString: string;
}) {
  if (postList.length === 0) return <EmptyUi text="아직 게시글이 없어요." />;

  return (
    <ul className="divide-y divide-neutral-200 min-h-[529px]">
      {postList.map((item) => (
        <li key={item.id} className="hover:bg-neutral-50">
          <Link
            href={`/${abbr}/${item.id}?${queryString}`}
            className="block px-2 pb-2 lg:px-0"
          >
            <Title title={item.title} commentCount={item.comment_count} />
            <Info
              abbr={abbr}
              userName={item.user_name}
              ipAddress={item.ip_address}
              isLogin={item.is_login}
              createdAt={item.created_at}
              viewCount={item.view_count}
              likeCount={item.like_count}
              gallName={item.gall_name}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
