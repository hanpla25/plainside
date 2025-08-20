import Link from "next/link";

// --- 데이터 요청 ---
import { fetchCurrentUserData } from "@/app/lib/data/user-data";

// --- 타입 ---
import { UserData } from "@/app/lib/definitions";

// --- UI ---
import SigninLink from "../../common/SigninLink";

type Props = {
  userData: UserData | null;
};

const NeedLogin = () => {
  return <SigninLink />;
};

const Profile = ({ userData }: Props) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Link href="/profile">
          <span className="text-neutral-900 font-semibold">
            {userData?.name} 님
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-4 text-xs mt-3">
        <span>
          글 <Link href="/profile?menu=posts">{userData?.write_count}</Link>
        </span>

        <span>
          댓글{" "}
          <Link href="/profile?menu=comments">{userData?.comment_count}</Link>
        </span>
      </div>
    </div>
  );
};

export default async function LoginBox() {
  const userData = await fetchCurrentUserData();

  return userData ? <Profile userData={userData} /> : <NeedLogin />;
}
