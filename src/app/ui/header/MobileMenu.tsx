import { logout } from "@/app/lib/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  href: string;
  label: string;
  isForm?: boolean;
  action?: () => void;
};

export default function MobileMenu({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="absolute bg-white z-50 p-2 w-[100vw] h-[calc(100vh-60px)] lg:hidden flex flex-col gap-6 top-[60px]">
      <Item isLogin={isLogin} />
    </div>
  );
}

function Item({ isLogin }: { isLogin: boolean }) {
  const pathname = usePathname();
  const href = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  const commonLinks: MenuItem[] = [{ href: "/category", label: "전체 갤러리" }];

  const loginLinks: MenuItem[] = [
    { href: "/profile", label: "프로필" },
    { href: "#", action: logout, label: "로그아웃", isForm: true },
  ];

  const guestLinks: MenuItem[] = [
    { href: href, label: "로그인" },
    { href: "/signup", label: "회원가입" },
  ];
  return (
    <>
      {commonLinks.map(({ href, label }) => (
        <Link key={href} href={href} className="hover:bg-neutral-100 p-1 pl-2">
          {label}
        </Link>
      ))}

      {(isLogin ? loginLinks : guestLinks).map(({ href, label, isForm }) =>
        isForm ? (
          <form key={href} action={logout}>
            <button
              type="submit"
              className="block w-full cursor-pointer text-left hover:bg-neutral-100 p-1 pl-2"
            >
              {label}
            </button>
          </form>
        ) : (
          <Link
            key={href}
            href={href}
            className="hover:bg-neutral-100 p-1 pl-2"
          >
            {label}
          </Link>
        )
      )}
    </>
  );
}
