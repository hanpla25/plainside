import { Gall } from "@/app/lib/definitions";
import NewestGallList from "./NewestGallList";

type Props = {
  gallList: Gall[];
};

export default function NewestGallBox({ gallList }: Props) {
  return (
    <div className="space-y-2">
      <h2>최신 갤러리</h2>
      <NewestGallList gallList={gallList} />
    </div>
  );
}
