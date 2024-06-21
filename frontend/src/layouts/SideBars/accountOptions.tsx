import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Ellipsis, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export const AccountOptions = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/login");

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
