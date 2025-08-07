export default function AuthInput({
  type,
  label,
  name,
  placeholder,
}: {
  type: string;
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="email" className="text-sm text-neutral-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none"
        required
      />
    </div>
  );
}
