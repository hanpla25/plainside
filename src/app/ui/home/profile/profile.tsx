import { UserData } from "@/app/lib/definition";
import Link from "next/link";

type Props = {
  userData: UserData;
};

export default function Profile({ userData }: Props) {
  return (
    <div className="w-full">
      <div>
        <div className="flex justify-between items-center">
          <Link href={"/profile"}>
            <span className="text-neutral-900 font-semibold">
              {userData.user_name}님
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 text-xs mt-3">
          <span>
            글 <Link href={"/profile/posting"}>{userData.write_count}</Link>
          </span>
          <span>
            댓글 <Link href={"/profile/comment"}>{userData.comment_count}</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
