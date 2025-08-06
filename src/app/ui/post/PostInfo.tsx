export default function PostInfo({
  isLogin,
  userName,
  viewCount,
  likeCount,
  commentCount,
  ipAddress,
}: {
  isLogin: boolean;
  userName: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  ipAddress: string;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-200 mb-4">
      <span className="font-medium">
        {userName} {!isLogin && ipAddress}
      </span>
      <div className="space-x-2 text-sm text-neutral-600">
        <span>조회 {viewCount}</span>
        <span>추천 {likeCount}</span>
        <span>댓글 {commentCount}</span>
      </div>
    </div>
  );
}
