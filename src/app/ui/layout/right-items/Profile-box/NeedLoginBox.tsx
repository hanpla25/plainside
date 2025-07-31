"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NeedLogin() {
  const pathname = usePathname();
  const href = `/signin?callbackUrl=${encodeURIComponent(pathname)}`;

  return (
    <>
      <Link href={href}>로그인 하러가기</Link>
    </>
  );
}
