// --- 데이터 ---
import { fetchGallName } from "@/app/lib/data/gall-data";

// --- UI ---
import HeaderText from "@/app/ui/common/HeaderText";

type Params = Promise<{ abbr: string }>;

export default async function AbbrLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Params }>) {
  const { abbr } = await params;
  const gallName = await fetchGallName(abbr);

  return (
    <>
      <HeaderText text={`${gallName} 갤러리`} isLink={true} href={`/${abbr}`} />
      {children}
    </>
  );
}
