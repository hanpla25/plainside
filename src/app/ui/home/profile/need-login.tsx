"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NeedLogin() {
  const pathname: string = usePathname();

  return (
    <div className="">
      <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}>
        로그인해 주세요.
      </Link>
    </div>
  );
}
