import GallHeader from "@/app/ui/gall/GallHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GallHeader abbr={"create"} gallName={"갤러리 생성"} />
      {children}
    </>
  );
}
