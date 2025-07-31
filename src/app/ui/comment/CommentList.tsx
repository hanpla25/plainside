import type { Comment as CommentType } from "@/app/lib/definitions";
import formatDate from "@/app/utils/format-date";

type Props = { commentListData: CommentType[] | null };

export default function CommentList({ commentListData }: Props) {
  if (!commentListData) return null;

  return (
    <div>
      <div className="text-sm bg-neutral-100 p-2 rounded-md border border-neutral-400">
        댓글 {commentListData.length}개
      </div>

      {commentListData.map((item) => (
        <ul className="divide-y-1 divide-neutral-400" key={item.id}>
          <li className="p-2">
            <div className="space-x-4">
              <span>
                {item.user_name}
                {!item.user_id && `(${item.ip_address})`}
              </span>
              <span className="text-neutral-400 font-light">
                {formatDate(item.created_at, "time")}
              </span>
            </div>
            <div>
              <p>{item.content}</p>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}
