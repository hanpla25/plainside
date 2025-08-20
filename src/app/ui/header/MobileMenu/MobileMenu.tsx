"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// --- UI ---
import MobileMenuButton from "./MobileMenuButton";
import MobileMenuWrapper from "./MobileMenuWrapper";

type Props = {
  isLogin: boolean;
};

export default function MobileMenu({ isLogin }: Props) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden h-[24px]">
      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      />
      {isMobileMenuOpen && <MobileMenuWrapper isLogin={isLogin} />}
    </div>
  );
}
