import { GallMeta } from "@/app/lib/definitions";
import HeaderText from "@/app/ui/common/HeaderText";
import GallList from "@/app/ui/gall/GallList";

type Props = {
  popularGallMeta: GallMeta[];
};

export default function PopularGallList({ popularGallMeta }: Props) {
  return (
    <div>
      <HeaderText label={"인기 갤러리"} href={"/category"} />
      <GallList gallList={popularGallMeta} />
    </div>
  );
}
