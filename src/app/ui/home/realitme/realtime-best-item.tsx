import { Post } from "@/app/lib/definition";
import { formatDateTime } from "@/app/utils/foramt-date-time";
import { Tally1 } from "lucide-react";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function RealtimeBestItem({ post }: Props) {
  return (
    <li className="px-2 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Link href={`/gallery/${post.abbr}/${post.id}`}>
            <span className="truncate hover:underline">{post.title}</span>
          </Link>
          <span className="text-red-600 font-light text-sm">
            [{post.comment_count}]
          </span>
        </div>
        <div className="text-xs text-gray-600 flex items-center">
          <span className="mr-2">{post.gall_name}</span>
          <Tally1
            size={16}
            color="#212121"
            strokeWidth={0.5}
            className="h-3.5"
          />
          <span className="mr-2">
            {formatDateTime(post.created_at, "relative")}
          </span>
          <Tally1
            size={16}
            color="#212121"
            strokeWidth={0.5}
            className="h-3.5"
          />
          <span>{post.nickname}</span>
        </div>
      </div>
    </li>
  );
}
