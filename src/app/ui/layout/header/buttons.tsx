import Link from "next/link";

// --- Hooks ---
import useSignInHref from "@/app/hooks/use-signin-href";

// --- Icons ---
import { AlignJustify, Search, X } from "lucide-react";
import { signout } from "@/app/lib/actions/auth-actions";

function NavLinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="block w-full lg:w-auto">
      {children}
    </Link>
  );
}

// --- Links ---
export function CategoryLinkButton() {
  return <NavLinkButton href="/category">전체 갤러리</NavLinkButton>;
}

export function SignInLinkButton() {
  const href = useSignInHref();

  return <NavLinkButton href={href}>로그인</NavLinkButton>;
}

export function SignUpLinkButton() {
  return <NavLinkButton href="/signup">회원가입</NavLinkButton>;
}

export function ProfileLinkButton() {
  return <NavLinkButton href="/profile">프로필</NavLinkButton>;
}

// --- buttons ---
export function MobileMenuButton({
  isMobileMenuOpen,
  onClick,
}: {
  isMobileMenuOpen: boolean;
  onClick: () => void;
}) {
  const Icon = isMobileMenuOpen ? X : AlignJustify;

  return (
    <button onClick={onClick}>
      <Icon className="cursor-pointer" />
    </button>
  );
}

export function SignOutButton() {
  return (
    <form action={signout}>
      <button type="submit" className="block w-full cursor-pointer text-left">
        로그아웃
      </button>
    </form>
  );
}

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="cursor-pointer" aria-label="검색">
      <Search size={18} />
    </button>
  );
}
