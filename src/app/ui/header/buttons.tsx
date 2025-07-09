import { logout } from "@/app/lib/actions";
import { AlignJustify, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileMenuButtonProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type SearchButtonProps = {
  onClick: () => void;
};

const style = "border border-neutral-300 rounded-lg px-2 py-1 cursor-pointer";

export function MobileMenuButton({
  isMenuOpen,
  setIsMenuOpen,
}: MobileMenuButtonProps) {
  const Icon = isMenuOpen ? X : AlignJustify;

  return (
    <Icon
      className="lg:hidden cursor-pointer"
      onClick={() => setIsMenuOpen((prev) => !prev)}
    />
  );
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <Search size={18} />
    </button>
  );
}

export function CateogryButton() {
  return (
    <Link href={"/category"} className={`hidden lg:block ${style}`}>
      전체 갤러리
    </Link>
  );
}

export function LoginButton() {
  const pathname: string = usePathname();
  const href = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  return (
    <Link href={href} className={`hidden lg:block ${style}`}>
      로그인
    </Link>
  );
}

export function SignupButton() {
  return (
    <Link href={"/signup"} className={`hidden lg:block ${style}`}>
      회원가입
    </Link>
  );
}

export function ProfileButton() {
  return (
    <Link href={"/profile"} className={`hidden lg:block ${style}`}>
      프로필
    </Link>
  );
}

export function LogOutButton() {
  return (
    <div className="hidden lg:block">
      <form action={logout}>
        <button type="submit" className={`${style}`}>
          로그아웃
        </button>
      </form>
    </div>
  );
}
