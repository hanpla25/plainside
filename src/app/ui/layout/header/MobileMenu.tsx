import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutForm } from "./buttons";

const itemStyle = "hover:bg-neutral-100 p-1 pl-2";

type Props = {
  isLogin: boolean;
};

export default function MobileMenu({ isLogin }: Props) {
  return (
    <ul className="lg:hidden absolute bg-white z-50 p-2 w-[100vw] h-[calc(100vh-60px)] flex flex-col gap-6 top-[60px]">
      <CommonItems />
      {isLogin ? <LoginItems /> : <GuestItems />}
    </ul>
  );
}

function Item({ href, label }: { href: string; label: string }) {
  return (
    <li className={itemStyle}>
      <Link href={href} className="block w-full">
        {label}
      </Link>
    </li>
  );
}

function CommonItems() {
  return <Item href="/category" label="전체 갤러리" />;
}

function GuestItems() {
  const pathname: string = usePathname();
  const href = `/signin?callbackUrl=${encodeURIComponent(pathname)}`;

  return (
    <>
      <Item href={href} label="로그인" />
      <Item href="/signup" label="회원가입" />
    </>
  );
}

function LoginItems() {
  return (
    <>
      <Item href="/profile" label="프로필" />
      <LogoutForm className={itemStyle} buttonClassName="w-full text-left" />
    </>
  );
}
