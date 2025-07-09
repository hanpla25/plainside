import Link from "next/link";

type PostButtonProps = {
  modeValue: string;
  label: string;
  hrefModeParam?: string;
  abbr: string;
  mode?: string;
};

const style = "border border-neutral-400 p-1";

export function PostButton({
  modeValue,
  label,
  hrefModeParam,
  abbr,
  mode,
}: PostButtonProps) {
  const isActive = mode === modeValue;

  const href = hrefModeParam
    ? `/gallery/${abbr}?mode=${hrefModeParam}`
    : `/gallery/${abbr}`;

  return (
    <Link
      href={href}
      className={`${style} ${
        isActive ? "bg-neutral-600 text-white" : "text-neutral-600"
      }`}
    >
      {label}
    </Link>
  );
}
