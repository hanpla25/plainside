import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

export default function HeaderText({ label, href }: Props) {
  return (
    <h2 className="lg:px-0 text-[17px] px-2 py-2 font-bold">
      <Link href={href}>{label}</Link>
    </h2>
  );
}
