import Link from "next/link";

const list = [
  { name: "리그 오브 레전드", href: "/gallery/lol" },
  { name: "메이플스토리", href: "/gallery/maple" },
  { name: "스타크래프트", href: "/gallery/star" },
  { name: "리그 오브 레전드", href: "/gallery/lol" },
  { name: "메이플스토리", href: "/gallery/maple" },
  { name: "스타크래프트", href: "/gallery/star" },
  { name: "리그 오브 레전드", href: "/gallery/lol" },
  { name: "메이플스토리", href: "/gallery/maple" },
  { name: "스타크래프트", href: "/gallery/star" },
  { name: "리그 오브 레전드", href: "/gallery/lol" },
  { name: "메이플스토리", href: "/gallery/maple" },
  { name: "스타크래프트", href: "/gallery/star" },
  { name: "리그 오브 레전드", href: "/gallery/lol" },
  { name: "메이플스토리", href: "/gallery/maple" },
  { name: "스타크래프트", href: "/gallery/star" },
  { name: "리그 오브 레전드", href: "/gallery/lol" },
  { name: "메이플스토리", href: "/gallery/maple" },
  { name: "스타크래프트", href: "/gallery/star" },
  { name: "리그 오브 레전드", href: "/gallery/lol" },
  { name: "메이플스토리", href: "/gallery/maple" },
  { name: "스타크래프트", href: "/gallery/star" },
];

type Props = {
  search: string;
};

export default function ModalGalleryList({ search }: Props) {
  const filtered = list.filter((item) => item.name.includes(search));

  return (
    <ul className="bg-white max-h-64 overflow-y-auto">
      {filtered.length === 0 && (
        <li className="px-4 py-2 text-sm text-gray-500">결과 없음</li>
      )}
      {filtered.map((item, i) => (
        <li key={i}>
          <Link href={item.href} className="block px-4 py-2 hover:bg-gray-100">
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
