import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";

export const AccountCard = ({ account }: any) => {
  const router = useRouter();
  return (
    <div
      key={account.username}
      className="w-full h-full flex flex-col p-4 gap-4 items-center justify-evenly border-2"
    >
      <Avatar className="mr-4 h-[128px] w-[128px] ">
        <AvatarImage src={account.profileImage} />
      </Avatar>

      <Button
        className="flex flex-col flex-wrap"
        onClick={() => {
          localStorage.setItem("tokenRedeSocial", account.token);
          router.push("profile");
        }}
      >
        Continue as @{account.username}
      </Button>
    </div>
  );
};
