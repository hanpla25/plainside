import Link from "next/link";

// --- 타입 ---
import { Gall } from "@/app/lib/definitions";

type Props = {
  label: string;
  gallData: Gall[];
};

const Label = ({ label }: { label: string }) => {
  return <h2 className="mb-2">{label}</h2>;
};

const List = ({ gallData }: { gallData: Gall[] }) => {
  return (
    <div className="flex flex-col">
      {gallData.map((item, i) => (
        <div key={item.abbr}>
          <span>{i + 1}. </span>
          <Link href={item.abbr}>{item.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default async function GallList({ label, gallData }: Props) {
  return (
    <>
      <Label label={label} />
      <List gallData={gallData} />
    </>
  );
}
