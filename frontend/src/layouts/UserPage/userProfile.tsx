import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth.context";
import { useModalContext } from "@/contexts/modal.context";
import { UserInterface } from "@/interfaces/users.interfaces";
import { followUser, unfollowUser } from "@/services/follow.services";
import { useEffect, useState } from "react";

export const UserSectionProfile = ({ user, isProfile }: any) => {
  const {
    authenticatedUser,
    restrictActionToLoggedInUsers,
    getFollowingForAuthenticatedUser,
  } = useAuthContext();

  const [isFollowing, setIsFollowing] = useState(false);
  const displayedUser = isProfile ? authenticatedUser : user;

  useEffect(() => {
    const verifyIsFollowing = async () => {
      if (authenticatedUser) {
        const followers = await getFollowingForAuthenticatedUser();
        console.log(followers);

        setIsFollowing(
          followers.some((elem: UserInterface) => elem.id === user.id)
        );
      }
    };

    if (!isProfile) {
      verifyIsFollowing();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { setIsDialogFollowersOpen, setIsDialogFollowingOpen } =
    useModalContext();

  const handleFollowing = async () => {
    if (!restrictActionToLoggedInUsers("follow")) return;

    try {
      isFollowing ? await unfollowUser(user.id) : await followUser(user.id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    }
  };

  const RenderFollowButton = () => {
    if (isProfile) {
      return;
    }

    return (
      <Button onClick={() => handleFollowing()}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    );
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
            onClick={() => {
              setIsDialogFollowingOpen(true);
            }}
          >
            {displayedUser._count.following} following
          </span>

          <span
            className="hover:underline cursor-pointer"
            onClick={() => {
              setIsDialogFollowersOpen(true);
            }}
          >
            {displayedUser._count.followers} followers
          </span>
        </div>
      </div>
    </div>
  );
};
