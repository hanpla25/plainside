"use client";

import { AlignJustify, Search } from "lucide-react";
import Logo from "./logo";
import MobileSearchModal from "./mobile-search-modal";
import { useEffect, useState } from "react";
import MobileWrapper from "./mobile-menu";
import {
  CateogryButton,
  LoginButton,
  LogoutButton,
  ProfileButton,
  RecentVisitButton,
  SearchButton,
  SignupButton,
} from "./buttons";
import { MobileRecentVisit, RecentVisit } from "../recent-visit/recent-visit";
import { getRecentGalleries } from "@/app/hooks/useRecentGallery";

const isLogin = true;

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [openRecentVisit, setOpenRecentVisit] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [recentVisit, setRecentVisit] = useState<RecentGallery[]>([]);

  useEffect(() => {
    setRecentVisit(getRecentGalleries());
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4">
        <div>
          <Logo />
        </div>

        {/** 모바일 메뉴 */}
        <div className="lg:hidden flex gap-3">
          <Search onClick={() => setOpenModal((prev) => !prev)} />
          <RecentVisitButton
            onClick={() => setOpenRecentVisit((prev) => !prev)}
          />
          <AlignJustify onClick={() => setOpenMenu((prev) => !prev)} />
        </div>
        {/* 모바일 메뉴 **/}

        {/**데스크탑 메뉴 */}
        <div className="hidden lg:flex space-x-2 items-center">
          <SearchButton onClick={() => setOpenModal((prev) => !prev)} />
          {isLogin ? (
            <>
              <ProfileButton />
              <LogoutButton />
            </>
          ) : (
            <>
              <LoginButton />
              <SignupButton />
            </>
          )}

          <CateogryButton />
        </div>
        {/*데스크탑 메뉴 **/}
      </header>

      <MobileWrapper openMenu={openMenu} />
      <MobileSearchModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        search={search}
        setSearch={setSearch}
      />
      <RecentVisit recentVisit={recentVisit} />
      {openRecentVisit && <MobileRecentVisit recentVisit={recentVisit} />}
    </>
  );
}
