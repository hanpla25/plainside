import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

export default function HeaderText({ label, href }: Props) {
  return (
    <h2 className="text-[17px] px-2 lg:px-0 py-2">
      <Link href={href}>{label}</Link>
    </h2>
  );
}
