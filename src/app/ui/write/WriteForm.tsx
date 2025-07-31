"use client";

import { insertPost } from "@/app/lib/actions/post-actions";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import type { JSONContent } from "@tiptap/react";
import { useState } from "react";
import WriteButtons from "./WriteButtons";

type Props = {
  abbr: string;
  gallName: string;
  userName: string;
  userId: string | null;
  isLogin: boolean;
};

export default function WriteForm({
  abbr,
  gallName,
  userName,
  userId,
  isLogin,
}: Props) {
  const [content, setContent] = useState<string>("");

  const handleEditorChange = (jsonContent: JSONContent) => {
    setContent(JSON.stringify(jsonContent));
  };

  return (
    <form action={insertPost} className="">
      <div>
        <label htmlFor="userName" className="sr-only">
          닉네임
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="닉네임"
          className="w-full p-2 border-y border-neutral-200"
          defaultValue={userName}
          disabled={isLogin}
          readOnly={isLogin}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          className="w-full p-2 border-y border-neutral-200"
          disabled={isLogin}
          readOnly={isLogin}
          required
          hidden={isLogin}
        />
      </div>

      <div>
        <label htmlFor="title" className="sr-only">
          제목
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="제목"
          className="w-full p-2 border-y border-neutral-200"
          required
        />
      </div>

      <SimpleEditor onUpdate={handleEditorChange} />

      {userId && (
        <input type="hidden" name="userId" id="userId" value={userId} />
      )}
      <input type="hidden" name="gallName" id="gallName" value={gallName} />
      <input type="hidden" name="content" id="content" value={content} />
      <input type="hidden" name="abbr" id="abbr" value={abbr} />
      <input type="hidden" name="gallName" id="gallName" value={gallName} />

      <WriteButtons abbr={abbr} />
    </form>
  );
}
