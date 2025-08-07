"use server";

import { createClient } from "../../utils/supabase/server";

export async function increaseCollumFromPosts({
  postId,
  collum,
}: {
  postId: number;
  collum: "like_count" | "dislike_count";
}) {
  const supabase = await createClient();

  const collumMap = {
    like_count: "increment_post_like_count",
    dislike_count: "increment_post_dislike_count",
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
