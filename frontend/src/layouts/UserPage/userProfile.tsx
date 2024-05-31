import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/contexts/auth.context";
import { useModalContext } from "@/contexts/modal.context";

export const UserSectionProfile = ({ user }: any) => {
  const {} = useAuthContext();

  const { setIsDialogFollowedByOpen, setIsDialogFollowingOpen } =
    useModalContext();

  const handleFollowedByDialog = () => {
    setIsDialogFollowedByOpen(true);
  };

  const handleFollowingDialog = () => {
    setIsDialogFollowingOpen(true);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-primary z-10 rounded-t-2xl" />

      <div className="flex flex-col md:flex-row items-center my-6 gap-6 relative z-20 ml-4 mt-12">
        <Avatar className="w-[120px] h-[120px]">
          <AvatarImage src="https://avatars.githubusercontent.com/u/105565220?v=4" />
        </Avatar>

        <div className="mt-24">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <h2 className="text-lg text-gray-500">@{user.username}</h2>
        </div>
      </div>

      <div className="flex flex-col rounded-lg p-4 mb-4 relative z-20 justify-between h-36">
        <p>{user.description || "No bio yet."}</p>

        <div className="w-5/12 flex justify-between">
          <span
            className="hover:underline cursor-pointer"
            onClick={handleFollowingDialog}
          >
            {user._count.following} following
          </span>

          <span
            className="hover:underline cursor-pointer"
            onClick={handleFollowedByDialog}
          >
            {user._count.followedBy} followers
          </span>
        </div>
      </div>
    </div>
  );
};
