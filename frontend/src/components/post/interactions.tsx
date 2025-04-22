import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { cn } from "@/lib/utils";
import { LikeService } from "@/services/likes.services";
import { RepostService } from "@/services/reposts.services";
import { MessageSquare, Repeat2, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { errorLiking, errorReposting } from "./errors";
export interface PostMetricsState {
  likes: number;
  reposts: number;
  comments: number;
}
export interface PostInteractionsProps {
  postId: string;
  count: PostMetricsState;
  router: any;
}

export interface InteractionsState {
  isLiked: boolean;
  isReposted: boolean;
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
    <ul className="flex gap-6 mt-2 text-muted-foreground text-sm">
      {actions.map((action, index) => (
        <li
          key={index}
          className="flex items-center gap-2 cursor-pointer transition hover:text-primary"
          onClick={action.onClick}
        >
          <div
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full transition",
              action.active
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted"
            )}
          >
            {action.icon}
          </div>

          <span
            className={cn(
              "text-sm",
              action.active && "text-primary font-semibold"
            )}
          >
            {action.count}
          </span>
        </li>
      ))}
    </ul>
  );
};
