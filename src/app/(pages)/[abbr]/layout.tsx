// --- Data ---
import { fetchGallAbbrName } from "@/app/lib/gall-data";

// --- UI ---
import GallHeader from "@/app/ui/gall/GallHeader";

type Params = Promise<{ abbr: string }>;

export default async function AbbrLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Params }>) {
  const { abbr } = await params;
  const gallNameData = await fetchGallAbbrName(abbr);
  const { name: gallName } = gallNameData;

  return (
    <>
      <GallHeader abbr={abbr} gallName={gallName} />
      {children}
    </>
  );
}
