"use client";

import { increaseCollumFromPosts } from "@/app/lib/actions/post-actions";
import { useState } from "react";

function Button({
  label,
  postId,
  initialCount,
  collum,
}: {
  label: string;
  postId: number;
  initialCount: number;
  collum: "like_count" | "dislike_count";
}) {
  const [count, setCount] = useState(initialCount);
  const [disable, setDisable] = useState(false);

  const handleButtonClick = async () => {
    const data = await increaseCollumFromPosts({
      postId: postId,
      collum: collum,
    });

    setCount(data);
    setDisable(true);
  };

  return (
    <button
      onClick={handleButtonClick}
      className="border bg-neutral-600 text-white rounded-full p-2 space-x-2 cursor-pointer hover:bg-neutral-700"
      disabled={disable}
    >
      <span>{label}</span>
      <span>{count}</span>
    </button>
  );
}

export default function PostButtons({
  post_id,
  like_count,
  dislike_count,
}: {
  like_count: number;
  dislike_count: number;
  post_id: number;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        label={"개추"}
        postId={post_id}
        initialCount={like_count}
        collum={"like_count"}
      />
      <Button
        label={"비추"}
        postId={post_id}
        initialCount={dislike_count}
        collum={"dislike_count"}
      />
    </div>
  );
}
