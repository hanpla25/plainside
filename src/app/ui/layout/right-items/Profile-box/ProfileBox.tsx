import { UserData } from "@/app/lib/definitions";
import Link from "next/link";
import React from "react";

type Props = {
  userData: UserData;
};

export default function ProfileBox({ userData }: Props) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Link href="/profile">
          <span className="text-neutral-900 font-semibold">
            {userData.name} 님
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4 text-xs mt-3">
        <span>
          글 <Link href="/profile?menu=posts">{userData.write_count}</Link>
        </span>
        <span>
          댓글
          <Link href="/profile?menu=comments">{userData.comment_count}</Link>
        </span>
      </div>
    </div>
  );
}
