import clsx from "clsx";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SearchForm from "./search-form";
import ModalGalleryList from "./modal-gallery-list";

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

export default function MobileSearchModal({ openModal, setOpenModal }: Props) {
  const [search, setSearch] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false);
      }
    }

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal, setOpenModal]);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/20",
        !openModal && "hidden"
      )}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-md max-h-[80vh] overflow-y-auto"
      >
        <SearchForm
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Link href={"/category"} className="text-sm">
            전체 갤러리
          </Link>
        </div>
        <ModalGalleryList search={search} />
      </div>
    </div>
  );
}
