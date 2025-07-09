import { AuthFormState } from "@/app/lib/definitions";

export default function ErrorMsg({ state }: { state: AuthFormState }) {
  return (
    <>{state.msg && <p className="text-sm text-red-500">{state.msg}</p>}</>
  );
}
