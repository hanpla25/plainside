import Link from "next/link";

type Props = {
  name: string;
  abbr: string;
};

export default function SearchModalItem({ name, abbr }: Props) {
  return (
    <li>
      <Link
        href={`/gallery/${abbr}`}
        className="block px-4 py-2 hover:bg-gray-100"
      >
        {name}
      </Link>
    </li>
  );
}
