import GallList from "../gall/GallList";
import HeaderText from "../common/HeaderText";
import { GallMeta } from "@/app/lib/definitions";

type Props = {
  popularGallData: GallMeta[];
};

export default async function PopularGall({ popularGallData }: Props) {
  return (
    <div className="lg:hidden py-2">
      <HeaderText label="인기 갤러리" href="#" />
      <GallList gallData={popularGallData} />
    </div>
  );
}
