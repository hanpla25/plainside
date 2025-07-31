import Link from "next/link";

export function CreateGallLink() {
  return (
    <Link
      href={"/category/create"}
      className="mx-2 lg:mx-0 text-sm border rounded-2xl text-white bg-neutral-400 px-1.5 py-1"
    >
      갤러리 만들기
    </Link>
  );
}

export function CreateGallSubmitButton({
  submitting,
}: {
  submitting: boolean;
}) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 text-white rounded bg-neutral-500 hover:bg-neutral-600 disabled:opacity-50 cursor-pointer"
      >
        {submitting ? "신청 중..." : "신청"}
      </button>
    </div>
  );
}
