import { Post } from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";
import { Tally1 } from "lucide-react";
import Link from "next/link";

type Props = {
  realtimeBestData: {
    data: Post[];
    count: number;
    totalPages: number;
  };
};

export default function RealtimeBestList({ realtimeBestData }: Props) {
  if (realtimeBestData.count === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-neutral-500">
        게시글이 없습니다.
      </div>
    );
  }

  return (
    <ul>
      {realtimeBestData.data.map((item) => (
        <li key={item.id} className="hover:bg-gray-50 transition rounded-lg">
          <Link
            href={`/gallery/${item.abbr}/${item.id}`}
            className="block px-3 py-2"
          >
            <PostTitle item={item} />
            <PostInfo item={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PostTitle({ item }: { item: Post }) {
  return (
    <div className="space-x-2 text-lg truncate">
      <span>{item.title}</span>
      <span>[{item.comment_count}]</span>
    </div>
  );
}

function PostInfo({ item }: { item: Post }) {
  const { gall_name, created_at, user_name } = item;

  return (
    <>
      <div>
        <span className="text-sm">{gall_name}</span>
      </div>
      <div className="flex items-center text-xs text-neutral-500">
        <span> {formatDate(created_at, "relative")}</span>
        <Tally1 size={16} strokeWidth={0.5} className="h-3.5 ml-2" />
        <span className="ml-1">{user_name}</span>
      </div>
    </>
  );
}
