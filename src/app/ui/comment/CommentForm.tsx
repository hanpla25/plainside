// --- Data ---
import { getUserFromToken } from "@/app/lib/data/user-data";

export default async function CommentForm() {
  const user = await getUserFromToken();
  const isLogin = user ? true : false;

  return (
    <form className="lg:mx-0 mx-2 flex flex-col px-4 py-3 gap-4 border border-neutral-200 rounded-lg border-b-neutral-300">
      <label>댓글</label>
      <label htmlFor="username" className="sr-only">
        닉네임
      </label>

      <div className="w-full flex flex-row">
        <label htmlFor="username" className="sr-only">
          이름
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="닉네임"
          className="w-full p-1 border border-neutral-400 flex-1"
          defaultValue={user?.user_name}
          disabled={isLogin}
          minLength={2}
        />

        {!user && (
          <>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호"
              className="w-full p-1 border border-neutral-400 border-l-0 flex-1"
              minLength={2}
            />
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="comment" className="sr-only">
          댓글
        </label>

        <textarea
          name="comment"
          id="comment"
          placeholder="댓글 쓰기"
          className="flex-1 border border-neutral-300 px-3 py-2 rounded-md text-sm bg-neutral-100 focus:outline-none focus:border-neutral-500 resize-none"
          minLength={1}
        />

        <button
          type="submit"
          className="px-2 py-2 border border-neutral-300 rounded-md text-sm bg-white hover:bg-neutral-100 transition"
        >
          등록
        </button>
      </div>
    </form>
  );
}
