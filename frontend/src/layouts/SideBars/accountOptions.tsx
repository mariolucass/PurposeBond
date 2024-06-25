import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAuthContext } from "@/contexts/auth.context";
import { Ellipsis, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const AccountOptions = () => {
  const router = useRouter();

  const { setAuthenticatedUser } = useAuthContext();

  const handleLogout = () => {
    router.push("/login");

    setAuthenticatedUser(null);
    localStorage.removeItem("tokenRedeSocial");
  };

  const handleChangeAccount = () => {
    router.push("/accounts");

    setAuthenticatedUser(null);
    localStorage.removeItem("tokenRedeSocial");
  };

  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-slate-200">
          <Ellipsis className="relative top-0 right-0" />
        </MenubarTrigger>

        <MenubarContent className="flex flex-col gap-4">
          <MenubarItem className="flex gap-4" onClick={handleLogout}>
            <LogOut />
            Logout
          </MenubarItem>

          <MenubarItem className="flex gap-4" onClick={handleChangeAccount}>
            <LogOut />
            Switch Account
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
