import { logout } from "@/app/lib/actions";
import { AlignJustify, X, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const buttonStyle =
  "text-neutral-900 p-1 rounded-md text-[14px] border border-neutral-900 hidden lg:block coursor-pointer";

export function MobileMenuButton({
  isOpenMenu,
  setIsOpenMenu,
}: {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const Icon = isOpenMenu ? X : AlignJustify;

  return (
    <Icon
      onClick={() => setIsOpenMenu((prev) => !prev)}
      className="lg:hidden cursor-pointer"
    />
  );
}

export function SearchButton({
  setIsShowSearchForm,
}: {
  setIsShowSearchForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setIsShowSearchForm((prev) => !prev)}
      className="lg:bg-neutral-200 rounded-md flex px-2 py-1 cursor-pointer"
    >
      <span className="text-neutral-400 font-light text-sm mr-3 hidden lg:block">
        전체갤러리 검색
      </span>
      <Search size={18} />
    </button>
  );
}

export function CateogryButton() {
  return (
    <Link href={"/category"} className={buttonStyle}>
      전체 갤러리
    </Link>
  );
}

export function LoginButton() {
  const pathname: string = usePathname();

  return (
    <Link
      href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
      className={`${buttonStyle} hidden lg:block`}
    >
      로그인
    </Link>
  );
}

export function SignupButton() {
  return (
    <Link href={"/signup"} className={`${buttonStyle} hidden lg:block`}>
      회원가입
    </Link>
  );
}

export function LogOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className={`${buttonStyle} hidden lg:block cursor-pointer`}
      >
        로그아웃
      </button>
    </form>
  );
}

export function ProfileButton() {
  return (
    <Link href={"/profile"} className={`${buttonStyle} hidden lg:block`}>
      프로필
    </Link>
  );
}
