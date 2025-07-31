type AuthInputProps = {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
  errorMsg?: string[];
};

const divStyle = "flex flex-col gap-1 lg:mx-0";
const labelStyle = "block font-medium text-neutral-900";
const inputStyle = `w-full border-2 border-neutral-700 rounded-md px-3 py-2 text-sm placeholder:text-neutral-500 `;

export default function AuthInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  defaultValue,
  required = false,
  minLength,
  errorMsg,
}: AuthInputProps) {
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
        className={`${inputStyle} ${errorMsg ? "border-red-500" : ""}`}
      />
    </div>
  );
}
