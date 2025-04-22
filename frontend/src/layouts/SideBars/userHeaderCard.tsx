import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { useRouter } from "next/navigation";
import { AccountOptions } from "./accountOptions";

export const UserHeaderCard = () => {
  const { authenticatedUser } = useAuthContext();
  const router = useRouter();

  if (!authenticatedUser) return null;

  return (
    <div className="flex flex-row w-full px-4 py-5 gap-4 border-b-2 border-border bg-background text-foreground transition-colors duration-150 h-component items-center">
      <div className="flex items-center gap-2 flex-1">
        <Avatar
          className="w-10 h-10 border border-primary cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <AvatarImage src={authenticatedUser.profileImage} />
        </Avatar>

        <div className="flex flex-col">
          <span className="text-xs font-semibold leading-tight">
            {authenticatedUser.name}
          </span>
          <span className="text-xs text-muted-foreground">
            @{authenticatedUser.username}
          </span>
        </div>
      </div>

      <div className="flex items-start pt-1">
        <AccountOptions />
      </div>
    </div>
  );
};
