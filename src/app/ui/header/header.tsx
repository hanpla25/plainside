"use client";

import { useState } from "react";
import {
  CateogryButton,
  LoginButton,
  MobileMenuButton,
  SearchButton,
  SignupButton,
} from "./buttons";
import Logo from "./logo";
import SearchForm from "./search-form";
import Menu from "./menu";
import SearchModal from "./search-modal";
import { Gallery } from "@/app/lib/definition";

export default function Header({ galleryData }: { galleryData: Gallery[] }) {
  const [isShowSearchForm, setIsShowSearchForm] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      <header className="flex justify-between items-center p-4">
        <div>
          <Logo />
        </div>
        <div className="flex gap-4">
          <SearchButton setIsShowSearchForm={setIsShowSearchForm} />
          <MobileMenuButton setIsOpenMenu={setIsOpenMenu} />
          <CateogryButton />
          <LoginButton />
          <SignupButton />
        </div>
      </header>
      {isOpenMenu && <Menu />}
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
