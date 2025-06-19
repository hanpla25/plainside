import { Post } from "@/app/lib/definition";
import RealtimeBestList from "./realtime-best-list";

type Props = {
  realtimeBestData: Post[];
};

export default function RealtimeBest({ realtimeBestData }: Props) {
  return (
    <div className="w-full">
      <RealtimeBestList realtimeBestData={realtimeBestData} />
    </div>
  );
}
