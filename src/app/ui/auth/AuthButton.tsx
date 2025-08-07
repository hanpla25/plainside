export default function AuthButton({
  label,
  isPending,
}: {
  label: string;
  isPending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full py-2 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-700 transition disabled:opacity-50"
    >
      {label}
    </button>
  );
}
