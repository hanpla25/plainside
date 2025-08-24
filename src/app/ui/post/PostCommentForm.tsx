"use client";

import Form from "next/form";

// --- UI ---
import { FormInput, FormSubmitButton } from "../common/FormUi";
import { commentAction } from "@/app/lib/actions/post-actions";

type Props = {
  userName: string;
  isLogin: boolean;
  abbr: string;
  postId: number;
  parentId?: number;
};

export default function PostCommentForm({
  userName,
  isLogin,
  abbr,
  parentId,
  postId,
}: Props) {
  return (
    <Form
      action={commentAction}
      className="w-full p-4 lg:border border-neutral-300"
    >
      <div className="flex flex-col">
        <div className="flex gap-2 lg:flex-col">
          <div className="w-1/2 lg:w-full">
            <FormInput
              label="닉네임"
              type="text"
              name="name"
              placeholder="닉네임"
              defaultValue={userName}
              disabled={isLogin}
              minLength={2}
              maxLength={10}
            />
          </div>
          {!isLogin && (
            <div className="w-1/2 lg:w-full">
              <FormInput
                label="비밀번호"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
          )}
        </div>

        <div className="flex-1 mt-2">
          <label htmlFor="content" className="block text-sm font-semibold mb-1">
            댓글
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="댓글을 입력해주세요."
            className="w-full h-32 p-2 border border-neutral-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <input type="hidden" name="abbr" id="abbr" defaultValue={abbr} />
      <input type="hidden" name="postId" id="postId" defaultValue={postId} />

      {parentId && (
        <input
          type="hidden"
          name="parentId"
          id="parentId"
          defaultValue={parentId}
        />
      )}

      <div className="mt-3 flex justify-end">
        <FormSubmitButton label="작성" isPending={false} />
      </div>
    </Form>
  );
}
