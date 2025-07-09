"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function WriteLinkButton({ abbr }: { abbr: string }) {
  const pathname = usePathname();

  if (pathname === `/gallery/${abbr}/write`) {
    return null;
  }

  return (
    <Link
      href={`/gallery/${abbr}/write`}
      className="text-sm text-neutral-600 border border-neutral-400 p-0.5"
    >
      글쓰기
    </Link>
  );
}
