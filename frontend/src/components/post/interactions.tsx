import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { cn } from "@/lib/utils";
import { LikeService } from "@/services/likes.services";
import { RepostService } from "@/services/reposts.services";
import { MessageSquare, Repeat2, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { errorLiking, errorReposting } from "./errors";

export interface PostInteractionsProps {
  postId: string;
  count: {
    comments: number;
    likes: number;
    reposts: number;
  };
  router: any;
}

export interface InteractionsState {
  isLiked: boolean;
  isReposted: boolean;
}

export interface PostMetricsState {
  likes: number;
  reposts: number;
  comments: number;
}

export const PostInteractions = ({
  postId,
  count,
  router,
}: PostInteractionsProps) => {
  const {
    authenticatedUser,
    getLikesForAuthenticatedUser,
    getRepostsForAuthenticatedUser,
    restrictActionToLoggedInUsers,
  } = useAuthContext();

  const [postMetrics, setPostMetrics] = useState<PostMetricsState>({
    likes: count.likes,
    reposts: count.reposts,
    comments: count.comments,
  });
  const { likes, comments, reposts } = postMetrics;

  const [interactions, setInteractions] = useState<InteractionsState>({
    isLiked: false,
    isReposted: false,
  });
  const { isLiked, isReposted } = interactions;

  useEffect(() => {
    const checkInteractionStatus = async () => {
      const [likes, reposts] = await Promise.all([
        getLikesForAuthenticatedUser(),
        getRepostsForAuthenticatedUser(),
      ]);

      const newInteractions = {
        isLiked: likes.some((elem: any) => elem.id === postId),
        isReposted: reposts.some((elem: any) => elem.id === postId),
      };

      setInteractions((prev) => ({ ...prev, ...newInteractions }));
    };

    if (authenticatedUser) {
      checkInteractionStatus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePostState = (
    newInteractions: Partial<InteractionsState>,
    newMetrics: Partial<PostMetricsState>
  ) => {
    setInteractions((prev) => ({ ...prev, ...newInteractions }));
    setPostMetrics((prev) => ({ ...prev, ...newMetrics }));
  };

  const handleLike = async () => {
    if (!restrictActionToLoggedInUsers("like")) return;

    const action = isLiked ? LikeService.unlike : LikeService.like;

    try {
      await action(postId);
      updatePostState(
        { isLiked: !isLiked },
        { likes: likes + (isLiked ? -1 : 1) }
      );
    } catch (error) {
      errorLiking(error);
    }
  };

  const handleRepost = async () => {
    if (!restrictActionToLoggedInUsers("repost")) return;

    const action = isReposted ? RepostService.delete : RepostService.create;

    try {
      await action(postId);
      updatePostState(
        { isReposted: !isReposted },
        { reposts: reposts + (isReposted ? -1 : 1) }
      );
    } catch (error) {
      errorReposting(error);
    }
  };

  const handleComment = () => {
    router.push(`/posts/${postId}`);
  };

  const spanClass = "self-center font-semibold mt-2 text-sm";

  const actions = [
    {
      icon: <ThumbsUp />,
      onClick: handleLike,
      count: likes,
      active: isLiked,
    },
    {
      icon: <Repeat2 />,
      onClick: handleRepost,
      count: reposts,
      active: isReposted,
    },
    {
      icon: <MessageSquare />,
      onClick: handleComment,
      count: comments,
      active: false,
    },
  ];

  return (
    <ul className="flex justify-between">
      {actions.map((action, index) => (
        <li key={index} className="flex flex-col justify-left p-1">
          <Button
            onClick={action.onClick}
            variant={action.active ? "default" : "ghost"}
          >
            {action.icon}
          </Button>

          <span
            className={cn(
              spanClass,
              action.active && "text-[#4d7a86] font-bold"
            )}
          >
            {action.count}
          </span>
        </li>
      ))}
    </ul>
  );
};
