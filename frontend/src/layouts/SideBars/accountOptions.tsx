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

  const { authenticatedUser, setAuthenticatedUser } = useAuthContext();

  const handleLogout = () => {
    router.push("/login");

    const accountsString = localStorage.getItem("accounts");
    const accounts = accountsString ? JSON.parse(accountsString) : [];

    const { profileImage, username, name } = authenticatedUser;
    const token = localStorage.getItem("tokenRedeSocial");

    const haveAccount = accounts.some(
      (account: any) => account.username === username
    );

    if (!haveAccount) {
      accounts.push({ profileImage, username, name, token });
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }

    setAuthenticatedUser(null);
    localStorage.removeItem("tokenRedeSocial");
  };

  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-slate-200">
          <Ellipsis className="relative top-0 right-0" />
        </MenubarTrigger>

        <MenubarContent className="flex flex-col gap-2">
          <MenubarItem className="flex gap-2" onClick={handleLogout}>
            <LogOut />
            Logout
          </MenubarItem>

          <MenubarItem className="flex gap-2" onClick={handleLogout}>
            <LogOut />
            Switch Account
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
