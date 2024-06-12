import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth.context";
import { useModalContext } from "@/contexts/modal.context";

export const UserSectionProfile = ({ user, isProfile }: any) => {
  const { authenticatedUser } = useAuthContext();
  const displayedUser = isProfile ? authenticatedUser : user;

  const { setIsDialogFollowersOpen, setIsDialogFollowingOpen } =
    useModalContext();

  const handleFollowersDialog = () => {
    setIsDialogFollowersOpen(true);
  };

  const handleFollowingDialog = () => {
    setIsDialogFollowingOpen(true);
  };

  const followUser = async () => {};

  const unfollowUser = async () => {};

  const RenderFollowButton = () => {
    if (isProfile) {
      return;
    }

    if (!authenticatedUser) {
      return <Button>Follow</Button>;
    }

    const userIsFollowed = authenticatedUser.following.find(
      (elem: any) => elem.id === user.id
    );

    if (userIsFollowed) {
      return <Button onClick={unfollowUser}>Unfollow</Button>;
    }

    return <Button onClick={followUser}>Follow</Button>;
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-1/3 bg-primary z-10 rounded-t-2xl" />

      <div className="flex flex-col md:flex-row items-center my-6 gap-6 relative z-20 ml-4 mt-12">
        <Avatar className="w-[120px] h-[120px]">
          <AvatarImage src="https://avatars.githubusercontent.com/u/105565220?v=4" />
        </Avatar>

        <div className="mt-24">
          <h1 className="text-3xl font-bold">{displayedUser.name}</h1>
          <h2 className="text-lg text-gray-500">@{displayedUser.username}</h2>
        </div>
      </div>

      <div className="flex flex-col rounded-lg p-4 mb-4 relative z-20 justify-between h-36">
        <div className="flex w-full ">
          <p className="w-1/2">{displayedUser.description || "No bio yet."}</p>

          <div className="w-1/2 flex justify-end items-center ">
            <RenderFollowButton />
          </div>
        </div>

        <div className="w-5/12 flex justify-between">
          <span
            className="hover:underline cursor-pointer"
            onClick={handleFollowingDialog}
          >
            {displayedUser._count.following} following
          </span>

          <span
            className="hover:underline cursor-pointer"
            onClick={handleFollowersDialog}
          >
            {displayedUser._count.followers} followers
          </span>
        </div>
      </div>
    </div>
  );
};
