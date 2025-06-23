import { Comment, Post } from "@/app/lib/definition";
import { formatDateTime } from "@/app/utils/foramt-date-time";
import { Tally1 } from "lucide-react";
import Link from "next/link";

export default function CommentItem({
  content,
  gall_name,
  abbr,
  post_id,
  created_at,
}: Comment) {
  return (
    <Link href={`/gallery/${abbr}/${post_id}`} className="block px-2 py-1">
      <div className="">
        <span>{content}</span>
      </div>
      <div className="flex items-center text-neutral-600 font-light text-sm">
        <span className="mr-2">{gall_name}</span>
        <Tally1 size={16} color="#212121" strokeWidth={0.5} className="h-3.5" />
        <span>{formatDateTime(created_at, "yearMonthDate")}</span>
      </div>
    </Link>
  );
}
