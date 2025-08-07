import Link from "next/link";

// --- actions ---
import { UserPayload } from "@/app/lib/definitions";
import { fetchUserData } from "@/app/lib/data/user-data";

// --- UI ---
import NeedLogin from "./NeedLogin";

type Props = {
  user: UserPayload | null;
};

export default async function ProfileBox({ user }: Props) {
  if (!user) return <NeedLogin />;

  const userData = await fetchUserData(user);

  if (!userData) return <NeedLogin />;

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
