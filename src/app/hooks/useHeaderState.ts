import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const DEBOUNCE_DELAY = 0;

export default function useHeaderState() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, DEBOUNCE_DELAY);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setQuery("");
  }, [pathname]);

  return {
    isMenuOpen,
    setIsMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    query,
    setQuery,
    debouncedQuery,
  };
}
