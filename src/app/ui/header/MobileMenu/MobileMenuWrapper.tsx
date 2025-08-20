import Link from "next/link";

// --- 상수 ---
import { allGallHref } from "@/app/constants/href-constants";

// --- UI ---
import { LoginLinks, NonLoginLinks } from "../HeaderRightButtons";

type Props = {
  isLogin: boolean;
};

export default function MobileMenuWrapper({ isLogin }: Props) {
  return (
    <div className="absolute left-0 bg-white z-50 p-2 w-[100vw] h-[calc(100vh-60px)] flex flex-col gap-6">
      <Link href={allGallHref}>전체 갤러리</Link>
      {isLogin ? <LoginLinks /> : <NonLoginLinks />}
    </div>
  );
}
