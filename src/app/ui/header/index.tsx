"use client";

import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { Gall, UserPayload } from "@/app/lib/definitions";
import SearchModal from "./modal";
import HeaderButtons from "./HeaderButtons";
import useHeaderState from "@/app/hooks/useHeaderState";

type Props = {
  isLogin: boolean;
  gallList: Gall[];
};

export default function Header({ isLogin, gallList }: Props) {
  const {
    isMenuOpen,
    setIsMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    setQuery,
    debouncedQuery,
  } = useHeaderState();

  return (
    <>
      <div className="flex justify-between items-center p-2 lg:px-0 py-3">
        <Logo />
        <HeaderButtons
          isLogin={isLogin}
          isMenuOpen={isMenuOpen}
          setIsSearchOpen={setIsSearchOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
      {isMenuOpen && <MobileMenu isLogin={isLogin} />}
      {isSearchOpen && (
        <SearchModal
          setQuery={setQuery}
          debouncedQuery={debouncedQuery}
          gallList={gallList}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}
    </>
  );
}
