"use client";

import Form from "next/form";

// --- UI ---
import { FormInput, FormSubmitButton } from "../common/FormUi";

export default function PostCommentForm() {
  return (
    <Form action={""} className="w-full p-4 lg:border border-neutral-300">
      <div className="flex flex-col">
        {/* 왼쪽: 이름 + 비밀번호 */}
        <div className="flex gap-2 lg:flex-col">
          <div className="w-1/2 lg:w-full">
            <FormInput
              label="이름"
              type="text"
              name="user_name"
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div className="w-1/2 lg:w-full">
            <FormInput
              label="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
        </div>

        {/* 오른쪽: textarea */}
        <div className="flex-1 mt-2 md:mt-0">
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

      {/* 제출 버튼 */}
      <div className="mt-3 flex justify-end">
        <FormSubmitButton label="작성" isPending={false} />
      </div>
    </Form>
  );
}
