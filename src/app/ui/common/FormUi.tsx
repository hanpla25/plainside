import { KeyboardEvent } from "react";

export const FormInput = ({
  label,
  type,
  name,
  placeholder,
  disabled,
  defaultValue,
  minLength,
  maxLength,
  onKeyDown,
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}) => {
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
        required
        disabled={disabled}
        defaultValue={defaultValue}
        minLength={minLength}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
        className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none"
      />
    </div>
  );
};

export const FormSubmitButton = ({
  label,
  isPending,
}: {
  label: string;
  isPending: boolean;
}) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full py-2 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-700 transition disabled:opacity-50 cursor-pointer"
    >
      {label}
    </button>
  );
};

export const FormMsg = ({ msg }: { msg: string }) => {
  return <p className="text-sm text-red-500 mt-2">{msg}</p>;
};
