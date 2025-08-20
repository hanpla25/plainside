// --- 아이콘 ---
import { AlignJustify, X } from "lucide-react";

export default function MobileMenuButton({
  isMobileMenuOpen,
  onClick,
}: {
  isMobileMenuOpen: boolean;
  onClick: () => void;
}) {
  const Icon = isMobileMenuOpen ? X : AlignJustify;

  return (
    <button onClick={onClick}>
      <Icon className="cursor-pointer" />
    </button>
  );
}
