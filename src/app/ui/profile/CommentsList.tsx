import { Comment, UserCommentsData } from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";
import { Tally1 } from "lucide-react";
import Link from "next/link";

type Props = {
  comments: UserCommentsData;
};
export default function CommentsList({ comments }: Props) {
  const count = comments.count;
  const list = comments.data;

  return (
    <div className="border-b-2 border-neutral-300">
      <Header count={count} />
      <List list={list} />
    </div>
  );
}

function List({ list }: { list: Comment[] }) {
  if (list.length === 0) {
    return (
      <div className="py-2 divide-y divide-neutral-300 flex min-h-20">
        <span className="mx-auto my-auto">댓글이 없습니다.</span>
      </div>
    );
  }

  return (
    <ul className="py-2 divide-y divide-neutral-300">
      {list.map((item) => (
        <li key={item.id} className="px-4 py-2">
          <Link
            href={`/gallery/${item.abbr}/${item.id}`}
            className="block w-full y-full"
          >
            <Content {...item} />
            <Info {...item} />
            <PostTitle title={item.post_title} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Header({ count }: { count: number }) {
  return (
    <h2 className="px-4 py-2 border-b-2 border-neutral-300">
      <Link href={"/profile?menu=posts"} className="font-bold">
        댓글 ({count})
      </Link>
    </h2>
  );
}

function Content({ content }: Comment) {
  return <span>{content}</span>;
}

function Info({ gall_name, created_at }: Comment) {
  return (
    <div className="text-sm text-neutral-500 flex items-center">
      <span>{gall_name}</span>
      <Tally1 size={12} className="ml-2" />
      <span>{formatDate(created_at, "YMD")}</span>
    </div>
  );
}

function PostTitle({ title }: { title: string }) {
  return (
    <div className="">
      <span className="text-sm bg-neutral-100">{title}</span>
    </div>
  );
}
