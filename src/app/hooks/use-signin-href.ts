import { usePathname } from "next/navigation";

export default function useSignInHref() {
  const pathname = usePathname();
  return `/signin?callbackUrl=${encodeURIComponent(pathname)}`;
}
