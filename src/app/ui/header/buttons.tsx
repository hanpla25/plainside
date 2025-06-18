import { Search } from "lucide-react";
import Link from "next/link";

const buttonStyle = "bg-[#171717] text-white p-1 rounded-md text-[14px]";

export function LoginButton() {
  return (
    <Link href={"/login"} className={`${buttonStyle}`}>
      로그인
    </Link>
  );
}

export function ProfileButton() {
  return (
    <Link href={"/profile"} className={`${buttonStyle}`}>
      프로필
    </Link>
  );
}

export function SignupButton() {
  return (
    <Link href={"/signup"} className={buttonStyle}>
      회원가입
    </Link>
  );
}

export function LogoutButton() {
  return <button className={`${buttonStyle}`}>로그아웃</button>;
}

export function CateogryButton() {
  return (
    <Link
      href={"/category"}
      className="text-neutral-900 p-1 rounded-md text-[14px] border border-neutral-900"
    >
      전체 갤러리
    </Link>
  );
}

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-100 rounded-md p-1 flex justify-between px-4 w-sm "
    >
      <span className="text-gray-500">갤러리 검색</span>
      <Search />
    </button>
  );
}

export function RecentVisitButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-sm">
      최근방문
    </button>
  );
}
