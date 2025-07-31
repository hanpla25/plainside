"use client";

import { useActionState } from "react";
import { CreateGallSubmitButton } from "./buttons";
import { createGall } from "@/app/lib/actions/category-actions";

type InputProps = {
  label: string;
  id: string;
  placeholder?: string;
  message: string;
  errMsg?: string[];
  defaultValue?: string | undefined;
};

const inputStyle = `w-full  px-3 py-2 border rounded  outline-0 `;

export default function CategoryForm() {
  const [errorMsg, formAction, isPending] = useActionState(createGall, null);

  return (
    <form action={formAction} className="mx-2 lg:mx-0 space-y-4">
      <Input
        label={"이름"}
        id={"name"}
        message={`"갤러리" 는 자동으로 붙습니다. 예: 음식 → 음식 갤러리`}
        placeholder="예: 음식"
        errMsg={errorMsg?.errors?.gallName}
        defaultValue={errorMsg?.inputs?.gallName}
      />
      {errorMsg?.errors?.gallName && (
        <p id="streetAddress-error" className="text-sm text-red-500">
          {errorMsg.errors.gallName[0]}
        </p>
      )}

      <Input
        label={"URL"}
        id={"abbr"}
        message={`갤러리 경로에 사용될 URL (예: /gallery/food)`}
        placeholder="예: food"
        errMsg={errorMsg?.errors?.abbr}
        defaultValue={errorMsg?.inputs?.abbr}
      />
      {errorMsg?.errors?.abbr && (
        <p id="streetAddress-error" className="text-sm text-red-500">
          {errorMsg.errors.abbr[0]}
        </p>
      )}

      <CreateGallSubmitButton submitting={isPending} />
    </form>
  );
}

function Input({
  label,
  id,
  placeholder,
  message,
  errMsg,
  defaultValue,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={"text"}
        className={`${inputStyle} ${errMsg ? "border-red-500" : ""}`}
        placeholder={placeholder}
        required
        defaultValue={defaultValue}
      />
      <p className="text-sm text-gray-500 mt-1">{message}</p>
    </div>
  );
}
