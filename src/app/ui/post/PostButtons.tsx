"use client";

import {
  incrementDisLikeCount,
  incrementLikeCount,
} from "@/app/lib/actions/post-actions";
import { useState, useTransition } from "react";

export function LikeButton({
  postId,
  initialCount,
}: {
  postId: number;
  initialCount: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    startTransition(async () => {
      const result = await incrementLikeCount(postId);
      if (result?.newCount) {
        setCount(result.newCount);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="border bg-neutral-600 text-white rounded-full p-2 space-x-2 cursor-pointer hover:bg-neutral-700"
    >
      <span>개추</span>
      <span>{count}</span>
    </button>
  );
}

export function DisLikeButton({
  postId,
  initialCount,
}: {
  postId: number;
  initialCount: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    startTransition(async () => {
      const result = await incrementDisLikeCount(postId);
      if (result?.newCount) {
        setCount(result.newCount);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="border text-neutral-600 rounded-full p-2 space-x-2 cursor-pointer hover:bg-neutral-200"
    >
      <span>비추</span>
      <span>{count}</span>
    </button>
  );
}
