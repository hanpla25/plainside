import Link from "next/link";

// --- Types ---
import { PostList } from "@/app/lib/definitions";

// --- UI ---
import HaveNoDataMessage from "../common/HaveNoDataMessage";
import GallPostListTitle from "./GallPostListTitle";
import GallPostListInfo from "./GallPostListInfo";

type Props = {
  abbr: string;
  postList: PostList[];
  queryString: string;
};

export default function GallPostList({ abbr, postList, queryString }: Props) {
  if (postList.length === 0)
    return <HaveNoDataMessage message={"아직 작성된 게시글이 없어요."} />;

  return (
    <ul className="divide-y divide-neutral-200">
      {postList.map((item) => (
        <li key={item.id} className="hover:bg-neutral-50">
          <Link
            href={`/${abbr}/${item.id}?${queryString}`}
            className="block p-3"
          >
            <GallPostListTitle
              title={item.title}
              commentCount={item.comment_count}
            />
            <GallPostListInfo
              abbr={abbr}
              userName={item.user_name}
              ipAddress={item.ip_address}
              isLogin={item.is_login}
              createdAt={item.created_at}
              viewCount={item.view_count}
              likeCount={item.like_count}
              gallName={item.gall_name}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
