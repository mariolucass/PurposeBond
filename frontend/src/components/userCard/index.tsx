import { useModalContext } from "@/contexts/modal.context";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const UserCard = ({ user }: any) => {
  const { setIsDialogFollowersOpen, setIsDialogFollowingOpen } =
    useModalContext();

  const closeModal = () => {
    setIsDialogFollowersOpen(false);
    setIsDialogFollowingOpen(false);
  };

  return (
    <li className="flex items-center" onClick={closeModal}>
      <Avatar className="mr-4">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Link href={`/users/${user.id}`}>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>

          <p className="text-bgmodal">@{user.username}</p>
        </div>
      </Link>
    </li>
  );
};
