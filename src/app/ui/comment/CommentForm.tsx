export default function CommentForm() {
  return (
    <form className="flex flex-col p-2 gap-4 border border-neutral-400 rounded-md">
      <label htmlFor="comment">댓글</label>

      <label htmlFor="userName" className="sr-only">
        닉네임
      </label>

      <div className="w-full flex flex-row">
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="닉네임"
          className="w-full pl-1 border border-neutral-400 flex-1"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호"
          className="w-full pl-1 border border-neutral-400 border-l-0 flex-1"
        />
      </div>

      <input
        type="text"
        name="comment"
        id="comment"
        placeholder="댓글 쓰기"
        className="w-full border border-neutral-400 p-2 outline-0 bg-neutral-100"
      />
    </form>
  );
}
