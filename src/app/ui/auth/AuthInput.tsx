export default function AuthInput({
  type,
  label,
  name,
  placeholder,
  defaultValue,
  setInputName,
}: {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  setInputName?: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm text-neutral-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none"
        required
        onChange={(e) => {
          if (setInputName) {
            setInputName(e.target.value);
          }
        }}
        defaultValue={defaultValue}
      />
    </div>
  );
}
