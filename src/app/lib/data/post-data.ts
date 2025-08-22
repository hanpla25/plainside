"use server";

import { redirect } from "next/navigation";

// --- 타입 ---
import { DBComment, Post } from "../definitions";

// --- 유틸 ---
import { maskIpAddress } from "@/app/utils/masking";
import { createClient } from "@/app/utils/supabase/server";

export async function fetchPostData(
  abbr: string,
  postId: number
): Promise<Post> {
  const supabase = await createClient();

  await supabase.rpc("increment_post_view", { post_id: postId });

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id,user_name,title,content,abbr,gall_name,view_count,like_count,dislike_count,comment_count,ip_address,created_at,is_login"
    )
    .eq("id", postId)
    .single();

  if (error) {
    console.error(error);

    redirect(`/${abbr}`);
  }

  const maskedIp = maskIpAddress(data.ip_address);

  return {
    id: data.id,
    user_name: data.user_name,
    title: data.title,
    content: data.content,
    abbr: data.abbr,
    gall_name: data.gall_name,
    view_count: data.view_count,
    like_count: data.like_count,
    dislike_count: data.dislike_count,
    comment_count: data.comment_count,
    created_at: data.created_at,
    is_login: data.is_login,
    ip_address: maskedIp,
  };
}

export async function fetchCommentData(postId: number): Promise<DBComment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("postId", postId);

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}
