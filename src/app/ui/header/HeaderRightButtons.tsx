import Link from "next/link";
import { Suspense } from "react";

// --- UI ---
import MobileMenu from "./MobileMenu/MobileMenu";
import Search from "./Search/Search";
import SigninLink from "../common/SigninLink";
import SignoutButton from "./SignoutButton";

// --- 상수 ---
import {
  allGallHref,
  profileHref,
  signupHref,
} from "@/app/constants/href-constants";

// --- 아이콘 ---
import { Search as SearchIcon } from "lucide-react";

type Props = {
  isLogin: boolean;
};

export const NonLoginLinks = () => {
  return (
    <>
      <SigninLink />
      <Link href={signupHref}>회원가입</Link>
    </>
  );
};

export const LoginLinks = () => {
  return (
    <>
      <Link href={profileHref}>프로필</Link>
      <SignoutButton />
    </>
  );
};

export default function HeaderRightButtons({ isLogin }: Props) {
  return (
    <div className="flex items-center space-x-4">
      <Suspense fallback={<SearchIcon size={18} />}>
        <Search />
      </Suspense>
      <Link href={allGallHref} className="hidden lg:block">
        전체 갤러리
      </Link>
      {isLogin ? <LoginLinks /> : <NonLoginLinks />}
      <MobileMenu isLogin={isLogin} />
    </div>
  );
}
