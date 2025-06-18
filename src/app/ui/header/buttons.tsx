import Link from "next/link";

const buttonStyle = "bg-[#171717] text-white p-1 rounded-md text-[14px]";

export function Login() {
  return (
    <Link href={"/login"} className={`${buttonStyle}`}>
      Login
    </Link>
  );
}

export function Signup() {
  return (
    <Link href={"/signup"} className={buttonStyle}>
      회원가입
    </Link>
  );
}
