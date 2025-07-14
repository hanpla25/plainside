import { GallMeta } from "@/app/lib/definitions";
import HeaderText from "../../common/HeaderText";
import GallList from "../../common/GallList";

type Props = {
  newestGallData: GallMeta[];
};

export default function LargeNewestGall({ newestGallData }: Props) {
  return (
    <div>
      <HeaderText label={"최신 갤러리"} href={"/category"} />
      <GallList gallData={newestGallData} />
    </div>
  );
}
