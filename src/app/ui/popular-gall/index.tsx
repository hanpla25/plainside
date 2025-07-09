import { Gall } from "@/app/lib/definitions";
import PopularGallHeader from "./PopularGallHeader";
import PopularGallList from "./PopularGallList";

type Props = {
  popularGallData: Gall[];
};

export default function PopularGall({ popularGallData }: Props) {
  return (
    <div className="lg:hidden px-2 py-2">
      <PopularGallHeader />
      <PopularGallList popularGallData={popularGallData} />
    </div>
  );
}
