import { Gallery } from "@/app/lib/definition";
import SearchModalItem from "./search-modal-item";
import normalize from "@/app/utils/regular-expression/normalize";
import { useRef } from "react";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

type Props = {
  query: string;
  galleryData: Gallery[];
  onClose: () => void;
};

export default function SearchModal({ query, galleryData, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClose);

  const filterdGallery = galleryData.filter((item) =>
    normalize(item.gall_name).includes(normalize(query))
  );

  return (
    <div
      ref={ref}
      className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md min-w-xs bg-white border shadow-lg z-50"
    >
      <div className="border-b border-b-neutral-300 p-1">
        <span>검색어: </span>
        <strong>{query}</strong>
      </div>
      {filterdGallery.length === 0 ? (
        <div className="p-2 text-neutral-500">검색 결과가 없습니다.</div>
      ) : (
        <ul className="p-1">
          {filterdGallery.map((item, i) => (
            <SearchModalItem name={item.gall_name} abbr={item.abbr} key={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
