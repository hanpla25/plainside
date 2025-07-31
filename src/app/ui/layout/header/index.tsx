"use client";

import { GallMeta, UserPayload } from "@/app/lib/definitions";
import Logo from "./Logo";
import RightButtons from "./RightButtons";
import SearchModal from "./modal";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = { user: UserPayload | null; gallList: GallMeta[] };

export default function Header({ user, gallList }: Props) {
  const isLogin = !!user;
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname, isLogin]);

  return (
    <>
      <header className="lg:px-0 flex justify-between items-center p-2 py-3">
        <Logo />
        <RightButtons
          isLogin={isLogin}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      </header>
      {isMenuOpen && <MobileMenu isLogin={isLogin} />}
      {isSearchOpen && (
        <SearchModal
          onClick={() => setIsSearchOpen(false)}
          gallList={gallList}
        />
      )}
    </>
  );
}
