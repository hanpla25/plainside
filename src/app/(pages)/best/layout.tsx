// --- UI ---
import HeaderText from "@/app/ui/common/HeaderText";

export default function BestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HeaderText text="실시간 베스트" isLink={true} href="/best" />
      {children}
    </>
  );
}
