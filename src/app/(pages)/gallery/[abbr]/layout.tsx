import GalleryHeader from "@/app/ui/gallery/GalleryHeader";

type Params = Promise<{ abbr: string }>;

export default async function GalleryLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { abbr } = await params;

  return (
    <div>
      <GalleryHeader abbr={abbr} />
      {children}
    </div>
  );
}
