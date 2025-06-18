"use client";

import { AlignJustify, Search } from "lucide-react";
import Logo from "./logo";
import MobileSearchModal from "./mobile-search-modal";
import { useState } from "react";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center">
        <div>
          <Logo />
        </div>
        <div className="flex gap-3">
          <Search onClick={() => setOpenModal((prev) => !prev)} />
          <AlignJustify />
        </div>
      </header>
      <MobileSearchModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}
