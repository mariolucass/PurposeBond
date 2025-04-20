import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { useFollowContext } from "@/contexts/domains/SocialDomain/follow.context";
import { useModalContext } from "@/contexts/domains/UiDomain/modal.context";
import { cn } from "@/lib/utils";
import { FollowService } from "@/services/follow.services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const UserCard = ({ user }: { user: any }) => {
  const { following } = useFollowContext();
  const { authenticatedUser } = useAuthContext();
  const router = useRouter();

  const { setIsDialogFollowersOpen, setIsDialogFollowingOpen } =
    useModalContext();

  const initialFollowing = following
    ? following.some((u) => u.id === user.id)
    : false;

  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  const isNotProfile = authenticatedUser && user.id !== authenticatedUser.id;

  const handleToggleFollow = async () => {
    try {
      setLoading(true);
      isFollowing
        ? FollowService.unfollow(user.id)
        : FollowService.follow(user.id);

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Erro ao seguir/desseguir:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = () => {
    setIsDialogFollowersOpen(false);
    setIsDialogFollowingOpen(false);
    isNotProfile ? router.push(`/users/${user.id}`) : router.push(`/profile`);
  };

  return (
    <li className="flex items-center justify-between w-full">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleUserClick}
      >
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.profileImage} />
        </Avatar>

        <div className="flex flex-col">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="text-muted-foreground text-xs">
            @{user.username}
          </span>
        </div>
      </div>

      {isNotProfile && (
        <Button
          onClick={handleToggleFollow}
          disabled={loading}
          variant="outline"
          className={cn(
            "text-sm h-8 px-3 border text-primary",
            isFollowing ? "border-red-500" : "border-blue-500"
          )}
        >
          {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </li>
  );
};
