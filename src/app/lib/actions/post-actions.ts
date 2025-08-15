"use server";

import { headers } from "next/headers";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

export async function increaseCollumFromPosts({
  postId,
  collum,
}: {
  postId: number;
  collum: "like_count" | "dislike_count" | "comment_count";
}): Promise<number | null> {
  const supabase = await createClient();

  const collumMap = {
    like_count: "increment_post_like_count",
    dislike_count: "increment_post_dislike_count",
    comment_count: "increment_post_comment_count",
  };

  const { data, error } = await supabase.rpc(collumMap[collum], {
    post_id: postId,
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data?.[0]?.[collum] ?? null;
}

export async function insertCommentToSupabase(formData: FormData) {
  const postId = Number(formData.get("postId"));
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const content = formData.get("content") as string;
  const abbr = formData.get("abbr") as string;
  const gallName = formData.get("gallName") as string;
  const postTitle = formData.get("postTitle") as string;
  const firstCommentIdRaw = formData.get("firstCommentId");

  const firstCommentId =
    firstCommentIdRaw && firstCommentIdRaw !== "null"
      ? Number(firstCommentIdRaw)
      : null;

  const headersList = await headers();
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();
  const isLogin = !!authData.user;

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_name: username,
    ip_address: ipAddress,
    content,
    password,
    abbr,
    gall_name: gallName,
    post_title: postTitle,
    first_comment_id: firstCommentId,
    is_login: isLogin,
  });

  if (error) {
    console.error(error);
    return;
  }

  await increaseCollumFromPosts({
    postId,
    collum: "comment_count",
  });

  redirect(`/${abbr}/${postId}`);
}
