import { Gallery } from "@/app/lib/definition";

type Props = Gallery & {
  index: number;
};

export default function LatestGalleryItem({ abbr, gall_name, index }: Props) {
  return (
    <li className="py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
      <span className="text-neutral-900">
        {index}. {gall_name}
      </span>
      <span className="text-sm text-neutral-400">{abbr}</span>
    </li>
  );
}
