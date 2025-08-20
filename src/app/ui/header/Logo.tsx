import Link from "next/link";

export default function Logo() {
  return (
    <h1 className="text-2xl font-bold lg:text-3xl">
      <Link href={"/"}>PLAINSIDE</Link>
    </h1>
  );
}
