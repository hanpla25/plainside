"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// --- UI ---
import Logo from "./Logo";
import RightButtons from "./RightButtons";
import MobileMenuWrapper from "./MobileMenuWrapper";
import SearchModal from "./modal";

type Props = {
  isLogin: boolean;
  gallList: {
    name: string;
    abbr: string;
  }[];
};

export default function Header({ isLogin, gallList }: Props) {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname, isLogin]);

  return (
    <>
      <header className="lg:px-0 flex justify-between items-center px-2 py-3">
        <Logo />
        <RightButtons
          isLogin={isLogin}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onClick={() => setIsSearchOpen((prev) => !prev)}
        />
      </header>

      {isMobileMenuOpen && <MobileMenuWrapper isLogin={isLogin} />}
      {isSearchOpen && (
        <SearchModal
          onClick={() => setIsSearchOpen((prev) => !prev)}
          gallList={gallList}
        />
      )}
    </>
  );
}
