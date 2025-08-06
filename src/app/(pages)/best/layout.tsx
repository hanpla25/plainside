// --- Constants ---
import { BEST_ABBR } from "@/app/constants/href-constants";

// --- UI ---
import GallHeader from "@/app/ui/gall/GallHeader";

type Params = Promise<{ abbr: string }>;

export default async function BestLayout({
  children,
}: Readonly<{ children: React.ReactNode; params: Params }>) {
  return (
    <>
      <GallHeader abbr={BEST_ABBR} gallName={"실시간 베스트"} />
      {children}
    </>
  );
}
