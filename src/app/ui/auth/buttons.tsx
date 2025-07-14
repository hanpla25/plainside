import { Loader2 } from "lucide-react";

export function SubmitButton({
  label,
  isPending,
}: {
  label: string;
  isPending: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 justify-center mt-8 mx-2 lg:mx-0">
      <button
        type="submit"
        className={`flex justify-center cursor-pointer bg-neutral-600 text-white py-2 rounded-md disabled:opacity-60 hover:bg-neutral-700 ${
          isPending && "bg-neutral-500"
        }`}
        disabled={isPending}
      >
        <div className="flex items-center">
          <span className={`${isPending ? "relative left-2" : ""}`}>
            {label}
          </span>
          {isPending && (
            <Loader2 size={16} className="animate-spin relative left-3" />
          )}
        </div>
      </button>
    </div>
  );
}
