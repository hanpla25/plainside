type TextInputProps = {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
};

const divStyle = "flex flex-col gap-1 mx-2 lg:mx-0";
const labelStyle = "block font-medium text-neutral-900";
const inputStyle =
  "w-full border border-neutral-200 rounded-md px-3 py-2 outline-1 text-sm placeholder:text-neutral-500";

export default function AuthInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  defaultValue,
  required = false,
  minLength,
}: TextInputProps) {
  return (
    <div className={divStyle}>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        minLength={minLength}
        className={inputStyle}
      />
    </div>
  );
}
