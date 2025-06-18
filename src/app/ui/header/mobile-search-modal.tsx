"use client";

import Link from "next/link";
import { useRef } from "react";
import SearchForm from "./search-form";
import ModalGalleryList from "./modal-gallery-list";
import useOnClickOutside from "@/app/hooks/useOutsideClick";
import useLockBodyScroll from "@/app/hooks/useOutsideScrollRock";

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function MobileSearchModal({
  openModal,
  setOpenModal,
  search,
  setSearch,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, () => setOpenModal(false));
  useLockBodyScroll(openModal);

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-md max-h-[80vh] overflow-y-auto"
      >
        <SearchForm
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Link href="/category" className="text-sm">
            전체 갤러리
          </Link>
        </div>
        <ModalGalleryList search={search} />
      </div>
    </div>
  );
}
