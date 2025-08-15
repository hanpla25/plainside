// --- UI ---
import GallHeader from "@/app/ui/gall/GallHeader";
import Link from "next/link";

export default function CategoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="lg:mx-0 mx-2 flex items-center justify-between">
        <GallHeader abbr={"category"} gallName={"전체 갤러리"} />
        <Link href={"/create"}>갤러리 생성</Link>
      </div>
      {children}
    </>
  );
}
