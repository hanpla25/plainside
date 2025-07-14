import { AlignJustify, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileMenuButtonProps = {
  isMenuOpen: boolean;
  onClick: () => void;
};

const buttonStyle =
  "border border-neutral-300 rounded-lg px-2 py-1 cursor-pointer";

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="cursor-pointer" aria-label="검색">
      <Search size={18} />
    </button>
  );
}

export function MobileMenuButton({
  isMenuOpen,
  onClick,
}: MobileMenuButtonProps) {
  const Icon = isMenuOpen ? X : AlignJustify;

  return (
    <button onClick={onClick}>
      <Icon className="cursor-pointer" />
    </button>
  );
}

export function CategoryLinkButton() {
  return <NavLinkButton href="/category">전체 갤러리</NavLinkButton>;
}

export function LoginLinkButton() {
  const pathname: string = usePathname();
  const href = `/signin?callbackUrl=${encodeURIComponent(pathname)}`;

  return <NavLinkButton href={href}>로그인</NavLinkButton>;
}

export function LogOutButton() {
  return (
    <form>
      <button type="submit" className={`${buttonStyle}`}>
        로그아웃
      </button>
    </form>
  );
}

export function SignupLinkButton() {
  return <NavLinkButton href="/signup">회원가입</NavLinkButton>;
}

export function ProfileLinkButton() {
  return <NavLinkButton href="/profile">프로필</NavLinkButton>;
}

function NavLinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonStyle}>
      {children}
    </Link>
  );
}
