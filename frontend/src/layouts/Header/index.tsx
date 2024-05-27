import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export const Header = () => {
  const pathName = usePathname();
  const router = useRouter();

  return <header></header>;
};
