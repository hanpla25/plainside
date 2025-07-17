import { GallMeta } from "@/app/lib/definitions";
import HeaderText from "../../common/HeaderText";
import GallList from "../../gall/GallList";

type Props = {
  popularGallData: GallMeta[];
};

export default function LargePopularGall({ popularGallData }: Props) {
  return (
    <div>
      <HeaderText label={"인기 갤러리"} href={"/category"} />
      <GallList gallData={popularGallData} />
    </div>
  );
}
