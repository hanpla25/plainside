import { Post } from "@/app/lib/definition";
import { formatDateTime } from "@/app/utils/foramt-date-time";
import { Tally1 } from "lucide-react";
import Link from "next/link";

export default function PostItem({
  title,
  gall_name,
  abbr,
  id,
  created_at,
}: Post) {
  return (
    <Link href={`/gallery/${abbr}/${id}`} className="block px-2 py-1">
      <div className="">
        <span>{title}</span>
      </div>
      <div className="flex items-center text-neutral-600 font-light text-sm">
        <span className="mr-2">{gall_name}</span>
        <Tally1 size={16} color="#212121" strokeWidth={0.5} className="h-3.5" />
        <span>{formatDateTime(created_at, "yearMonthDate")}</span>
      </div>
    </Link>
  );
}
