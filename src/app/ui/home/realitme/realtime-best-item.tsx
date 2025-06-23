import { Post } from "@/app/lib/definition";
import { formatDateTime } from "@/app/utils/foramt-date-time";
import { Tally1 } from "lucide-react";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function RealtimeBestItem({ post }: Props) {
  const href = `/gallery/${post.abbr}/${post.id}`;

  return (
    <>
      {/* 모바일 */}
      <li className="lg:hidden">
        <Link href={href}>
          <div className="px-2 py-4 hover:bg-gray-100 transition">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <span className="truncate">{post.title}</span>
                <span className="text-red-600 font-light text-sm">
                  [{post.comment_count}]
                </span>
              </div>
              <InfoBar post={post} />
            </div>
          </div>
        </Link>
      </li>

      {/* 데스크탑 */}
      <li className="hidden lg:block px-2 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Link href={href}>
              <span className="truncate hover:underline">{post.title}</span>
            </Link>
            <span className="text-red-600 font-light text-sm">
              [{post.comment_count}]
            </span>
          </div>
          <InfoBar post={post} />
        </div>
      </li>
    </>
  );
}

function InfoBar({ post }: { post: Post }) {
  return (
    <div className="text-xs text-gray-600 flex items-center">
      <span className="mr-2">{post.gall_name}</span>
      <Tally1 size={16} color="#212121" strokeWidth={0.5} className="h-3.5" />
      <span className="mr-2">
        {formatDateTime(post.created_at, "relative")}
      </span>
      <Tally1 size={16} color="#212121" strokeWidth={0.5} className="h-3.5" />
      <span>{post.user_name}</span>
    </div>
  );
}
