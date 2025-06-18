import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export default function MobileWrapperItems({ href, label }: Props) {
  return (
    <li className="p-2">
      <Link href={href}>{label}</Link>
    </li>
  );
}
