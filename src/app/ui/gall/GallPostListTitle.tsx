type Props = {
  title: string;
  commentCount: number;
};

export default function GallPostListTitle({ title, commentCount }: Props) {
  return (
    <div className="flex items-center gap-2 font-medium">
      <span className="truncate">{title}</span>
      <span className="text-xs text-neutral-700 bg-neutral-200 px-1 rounded">
        {commentCount}
      </span>
    </div>
  );
}
