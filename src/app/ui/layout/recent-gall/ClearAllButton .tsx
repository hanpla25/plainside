type Props = {
  clearAll: () => void;
};

export default function ClearAllButton({ clearAll }: Props) {
  return (
    <div className="space-x-2 mt-2">
      <button
        onClick={() => {
          clearAll();
        }}
        className="px-3 py-1 cursor-pointer bg-red-500 text-sm text-white rounded-lg"
      >
        전체삭제
      </button>
    </div>
  );
}
