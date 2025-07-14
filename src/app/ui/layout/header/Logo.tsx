import Link from "next/link";

export default function Logo() {
  return (
    <h1 className="text-3xl font-bold">
      <Link href={"/"}>PLAINSIDE</Link>
    </h1>
  );
}
