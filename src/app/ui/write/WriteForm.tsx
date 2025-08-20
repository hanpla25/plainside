"use client";

import { useActionState, useState } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { JSONContent } from "@tiptap/react";

// --- actions ---
import { writeAction } from "@/app/lib/actions/post-actions";

// --- UI ---
import { FormInput, FormMsg } from "../common/FormUi";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

type Props = {
  abbr: string;
  gallName: string;
  isLogin: boolean;
  userName: string;
};

const CancleButton = () => {
  const router = useRouter();

  const handleCancel = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      className="min-w-[72px] px-4 py-2 border border-neutral-300 rounded-md text-sm hover:bg-neutral-100 transition cursor-pointer text-center"
    >
      취소
    </button>
  );
};

const WriteButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="min-w-[72px] px-4 py-2 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-700 transition disabled:opacity-50 cursor-pointer text-center"
    >
      글쓰기
    </button>
  );
};

const Buttons = ({ isPending }: { isPending: boolean }) => {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <CancleButton />
      <WriteButton isPending={isPending} />
    </div>
  );
};

export default function WriteForm({
  abbr,
  gallName,
  isLogin,
  userName,
}: Props) {
  const [content, setContent] = useState<string>("");

  const handleEditorChange = (jsonContent: JSONContent) => {
    setContent(JSON.stringify(jsonContent));
  };

  const [msg, formAction, isPending] = useActionState(writeAction, null);

  return (
    <Form action={formAction} className="mt-3 px-2 pb-10 lg:px-0 space-y-3">
      <div className="flex items-center gap-4">
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

        {!isLogin && (
          <FormInput
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호"
            minLength={4}
            maxLength={20}
          />
        )}
      </div>

      <FormInput
        label="제목"
        type="text"
        name="title"
        placeholder="제목"
        maxLength={20}
      />

      <div className="border border-neutral-300">
        <SimpleEditor onUpdate={handleEditorChange} />
      </div>

      {!!msg && <FormMsg msg={msg} />}
      <input type="hidden" name="abbr" id="abbr" value={abbr} />
      <input type="hidden" name="gallName" id="gallName" value={gallName} />
      <input type="hidden" name="content" id="content" value={content} />
      <Buttons isPending={isPending} />
    </Form>
  );
}
