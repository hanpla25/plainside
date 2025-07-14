import { fetchGallName } from "@/app/lib/data";
import HeaderText from "@/app/ui/common/HeaderText";

type Params = Promise<{ abbr: string }>;

export default async function GallLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Params }>) {
  const { abbr } = await params;
  const gallName = await fetchGallName(abbr);

  return (
    <div>
      <HeaderText label={gallName} href={`/gallery/${abbr}`} />
      {children}
    </div>
  );
}
