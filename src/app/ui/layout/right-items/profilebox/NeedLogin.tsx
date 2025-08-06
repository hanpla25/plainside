"use client";
import Link from "next/link";

// --- hooks ---
import useSignInHref from "@/app/hooks/use-signin-href";

export default function NeedLogin() {
  const href = useSignInHref();

  return (
    <>
      <Link href={href}>로그인 하러가기</Link>
    </>
  );
}
