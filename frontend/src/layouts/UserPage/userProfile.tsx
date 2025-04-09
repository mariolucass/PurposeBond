import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { useModalContext } from "@/contexts/domains/UiDomain/modal.context";
import { UserInterface } from "@/interfaces/users.interfaces";
import { followUser, unfollowUser } from "@/services/follow.services";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { EditProfile } from "./editProfile";

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
      if (authenticatedUser && !isProfile) {
        const followers = await getFollowingForAuthenticatedUser();
        setIsFollowing(
          followers.some((elem: UserInterface) => elem.id === user.id)
        );
      }
    };

    verifyIsFollowing();
  }, []);

  const { setIsDialogFollowersOpen, setIsDialogFollowingOpen } =
    useModalContext();

  const handleFollowing = async () => {
    if (!restrictActionToLoggedInUsers("follow")) return;

    try {
      isFollowing ? await unfollowUser(user.id) : await followUser(user.id);
      setIsFollowing(!isFollowing);
      const updateCount = isFollowing ? -1 : 1;
      displayedUser._count.followers += updateCount;
    } catch (error) {
      console.error("Error following/unfollowing:", error);
    }
  };

  const RenderFollowButton = () => {
    if (isProfile) return null;

    return (
      <Button
        variant="outline"
        onClick={handleFollowing}
        className={`text-sm px-4 py-2   ${
          isFollowing ? " border-red-500 " : " border-blue-500"
        }`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    );
  };

  const followStats = [
    {
      count: displayedUser._count.following,
      onClick: () => setIsDialogFollowingOpen(true),
      label: "following",
    },
    {
      count: displayedUser._count.followers,
      onClick: () => setIsDialogFollowersOpen(true),
      label: "followers",
    },
  ];

  return (
    <div className="relative w-full bg-background text-foreground rounded-lg overflow-hidden">
      <div className="w-full h-40 bg-foreground dark:bg-muted" />

      <div className="relative z-10 px-6 -mt-16 flex justify-between items-end ">
        <div className="flex gap-4 items-end">
          <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
            <AvatarImage src={displayedUser.profileImage} />
          </Avatar>

          <div className="mt-20">
            <h1 className="text-2xl font-bold">{displayedUser.name}</h1>
            <p className="text-muted-foreground text-sm">
              @{displayedUser.username}
            </p>
          </div>
        </div>

        {isProfile ? <EditProfile /> : <RenderFollowButton />}
      </div>

      <div className="px-6 py-4 flex flex-col gap-4">
        <p className="text-sm text-foreground break-words">
          {displayedUser.description || "No bio yet."}
        </p>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {displayedUser.address || "Somewhere"}
          </span>

          <ul className="flex gap-4">
            {followStats.map((item, index) => (
              <li key={index}>
                <span
                  className="hover:underline cursor-pointer font-semibold text-foreground"
                  onClick={item.onClick}
                >
                  {item.count} {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
