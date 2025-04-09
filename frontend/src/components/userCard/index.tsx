import { useFollowContext } from "@/contexts/domains/SocialDomain/follow.context";
import { FollowService } from "@/services/follow.services";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const UserCard = ({ user }: any) => {
  const { following } = useFollowContext();

  const initialFollowing = following
    ? following.some((u) => u.id === user.id)
    : false;

  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

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
  return (
    <li className="flex items-center justify-between w-full">
      <Link href={`/users/${user.id}`} className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.profileImage} />
        </Avatar>

        <div className="flex flex-col">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="text-muted-foreground text-xs">
            @{user.username}
          </span>
        </div>
      </Link>

      <Button
        onClick={handleToggleFollow}
        disabled={loading}
        variant="outline"
        className={`text-sm h-8 px-3 border-primary text-primary  ${
          isFollowing ? " border-red-500 " : " border-blue-500 "
        }`}
      >
        {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </li>
  );
};
