import { Post } from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";
import { Tally1 } from "lucide-react";
import Link from "next/link";

type Props = {
  PostListData: Post[];
  isAbbr?: boolean | undefined;
  abbr?: string;
  query?: string;
};

function Title({ item, isAbbr }: { item: Post; isAbbr: boolean | undefined }) {
  return (
    <div className="flex justify-between items-center mb-1">
      <h2 className="font-medium text-neutral-800 line-clamp-1">
        {item.title}
      </h2>
      <div className="text-xs text-neutral-500">
        {!isAbbr && (
          <>
            <span>{item.gall_name}</span>
            <Tally1 className="inline ml-2" size={12} />
          </>
        )}

        <span>
          {isAbbr
            ? formatDate(item.created_at, "time")
            : formatDate(item.created_at, "relative")}
        </span>
      </div>
    </div>
  );
}

function Info({ item }: { item: Post }) {
  return (
    <div className="flex justify-between text-xs text-neutral-500">
      <span>{item.user_name}</span>
      <div className="flex gap-2">
        <span>조회 {item.view_count}</span>
        <span>추천 {item.like_count}</span>
        <span>댓글 {item.comment_count}</span>
      </div>
    </div>
  );
}

export default function PostList({
  PostListData,
  isAbbr,
  abbr = "",
  query,
}: Props) {
  if (!PostListData.length) {
    return (
      <div className="text-center py-10 text-neutral-500">
        게시글이 없습니다.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-200 text-sm py-4">
      {PostListData.map((item) => (
        <li
          key={item.id}
          className="lg:px-0 py-3 px-2.5 hover:bg-neutral-100 transition"
        >
          <Link
            href={
              abbr
                ? `/gallery/${abbr}/${item.id}${query ? `?${query}` : ""}`
                : `/${item.id}${query ? `?${query}` : ""}`
            }
            className="block"
          >
            <>
              <Title item={item} isAbbr={isAbbr} />
              <Info item={item} />
            </>
          </Link>
        </li>
      ))}
    </ul>
  );
}
