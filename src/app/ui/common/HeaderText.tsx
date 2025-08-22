import Link from "next/link";

type HeaderTextProps =
  | { text: string; isLink: true; href: string }
  | { text: string; isLink?: false; href?: never };

const LinkText = ({ href, text }: { href: string; text: string }) => {
  return (
    <div className="px-2 py-2 lg:px-0 pb-2">
      <Link href={href} className="font-semibold text-neutral-700">
        {text}
      </Link>
    </div>
  );
};

const Header = ({ text }: { text: string }) => {
  return (
    <h2 className="px-2 py-2 lg:px-0 pb-2 font-semibold text-neutral-700">
      {text}
    </h2>
  );
};

export default function HeaderText(props: HeaderTextProps) {
  if (props.isLink) {
    return <LinkText href={props.href} text={props.text} />;
  }
  return <Header text={props.text} />;
}
