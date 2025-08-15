"use server";

import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createGallToSupabase(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const rawData = {
    gallName: formData.get("gallName"),
    abbr: formData.get("abbr"),
  };

  const { gallName, abbr } = rawData;

  if (typeof gallName !== "string" || typeof abbr !== "string") {
    return "잘못된 형식이에요.";
  }

  const gallNameRegex = /^[가-힣\s]+$/;
  if (!gallNameRegex.test(gallName)) {
    return "갤러리 이름은 한글만 입력할 수 있어요.";
  }

  const abbrRegex = /^[a-z]+$/;
  if (!abbrRegex.test(abbr)) {
    return "갤러리 주소는 영어 소문자만 입력할 수 있어요.";
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("galleries")
    .insert({ name: gallName, abbr });

  if (error) {
    console.error(error);
    return "이미 존재하는 갤러리 이름이거나 주소에요.";
  }

  redirect("/category");
}
