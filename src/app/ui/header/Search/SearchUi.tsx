"use client";

import { useState } from "react";

// --- 타입 ---
import { Gall } from "@/app/lib/definitions";

// --- UI ---
import SearchModal from "./SearchModal";

// --- 아이콘 ---
import { Search } from "lucide-react";

const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return <Search size={18} onClick={onClick} className="cursor-pointer" />;
};

export default function SearchUi({ gallListData }: { gallListData: Gall[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchButton = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsSearchOpen(false);
  };

  return (
    <div>
      <SearchButton onClick={handleSearchButton} />
      {isSearchOpen && (
        <SearchModal gallListData={gallListData} closeModal={closeModal} />
      )}
    </div>
  );
}
