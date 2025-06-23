"use client";

import { useEffect, useState } from "react";
import {
  CateogryButton,
  LoginButton,
  LogOutButton,
  MobileMenuButton,
  ProfileButton,
  SearchButton,
  SignupButton,
} from "./buttons";
import Logo from "./logo";
import SearchForm from "./search-form";
import Menu from "./menu";
import SearchModal from "./search-modal";
import { Gallery, UserPayload } from "@/app/lib/definition";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header({
  galleryData,
  user,
}: {
  galleryData: Gallery[];
  user: UserPayload | null;
}) {
  const [isShowSearchForm, setIsShowSearchForm] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [query, setQuery] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    setQuery("");
    setIsShowSearchForm(false);
    setIsOpenMenu(false);
  }, [pathname]);

  return (
    <>
      <header className="flex justify-between items-center p-4">
        <div>
          <Logo />
        </div>
        <div className="flex lg:gap-2 items-center gap-2">
          <Link
            href={"/profile"}
            className="text-xs lg:hidden ml-2 lg:gap-0 font-bold"
          >
            {user?.user_name}
          </Link>
          <SearchButton setIsShowSearchForm={setIsShowSearchForm} />
          <MobileMenuButton
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
          />
          <CateogryButton />
          {user ? (
            <>
              <ProfileButton />
              <LogOutButton />
            </>
          ) : (
            <>
              <LoginButton />
              <SignupButton />
            </>
          )}
        </div>
      </header>
      {isOpenMenu && <Menu user={user} />}
      {isShowSearchForm && <SearchForm query={query} setQuery={setQuery} />}
      {query.trim() && (
        <SearchModal
          query={query}
          galleryData={galleryData}
          onClose={() => setQuery("")}
        />
      )}
    </>
  );
}
