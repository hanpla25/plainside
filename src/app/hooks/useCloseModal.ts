import { useEffect, useRef } from "react";

type Handler = () => void;

export default function useCloseModal(handler: Handler) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        blockClickFor(500);
        handler();
      }
    };

    const onEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscPress);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscPress);
    };
  }, [handler]);

  return ref;
}

export function blockClickFor(duration = 500) {
  const block = (e: MouseEvent) => {
    e.stopImmediatePropagation();
    e.preventDefault();
  };

  document.addEventListener("click", block, true);
  document.addEventListener("mouseup", block, true);

  setTimeout(() => {
    document.removeEventListener("click", block, true);
    document.removeEventListener("mouseup", block, true);
  }, duration);
}
