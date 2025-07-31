import { GallMeta } from "@/app/lib/definitions";
import HeaderText from "@/app/ui/common/HeaderText";
import GallList from "@/app/ui/gall/GallList";

type Props = {
  newestGallMeta: GallMeta[];
};

export default function NewestGallList({ newestGallMeta }: Props) {
  return (
    <>
      <div>
        <HeaderText label={"최신 갤러리"} href={"/category"} />
        <GallList gallList={newestGallMeta} />
      </div>
    </>
  );
}
