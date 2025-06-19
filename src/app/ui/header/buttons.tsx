import { AlignJustify, Search } from "lucide-react";
import Link from "next/link";
import { SetStateAction } from "react";

const buttonStyle = "bg-[#171717] text-white p-1 rounded-md text-[14px]";

export function MobileMenuButton({
  setIsOpenMenu,
}: {
  setIsOpenMenu: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <AlignJustify
      onClick={() => setIsOpenMenu((prev) => !prev)}
      className="lg:hidden"
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
    <Link
      href={"/category"}
      className="text-neutral-900 p-1 rounded-md text-[14px] border border-neutral-900 hidden lg:block"
    >
      전체 갤러리
    </Link>
  );
}

export function LoginButton() {
  return (
    <Link href={"/login"} className={`${buttonStyle} hidden lg:block`}>
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
