import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { cn } from "@/lib/utils";
import { LikeService } from "@/services/likes.services";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { errorLiking } from "./errors";

export interface CommentMetricsState {
  likes: number;
}
export interface CommentInteractionsProps {
  commentId: string;
  count: CommentMetricsState;
}

export interface InteractionsState {
  isLiked: boolean;
}

export const CommentInteractions = ({
  commentId,
  count,
}: CommentInteractionsProps) => {
  const {
    authenticatedUser,
    getLikesForAuthenticatedUser,
    getRepostsForAuthenticatedUser,
    restrictActionToLoggedInUsers,
  } = useAuthContext();

  const [commentMetrics, setCommentMetrics] = useState<CommentMetricsState>({
    likes: count.likes,
  });
  const { likes } = commentMetrics;

  const [interactions, setInteractions] = useState<InteractionsState>({
    isLiked: false,
  });
  const { isLiked } = interactions;

  useEffect(() => {
    const checkInteractionStatus = async () => {
      const [likes] = await Promise.all([getLikesForAuthenticatedUser()]);

      const newInteractions = {
        isLiked: likes.some((elem: any) => elem.id === commentId),
      };

      setInteractions((prev) => ({ ...prev, ...newInteractions }));
    };

    if (authenticatedUser) {
      checkInteractionStatus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCommentState = (
    newInteractions: Partial<InteractionsState>,
    newMetrics: Partial<CommentMetricsState>
  ) => {
    setInteractions((prev) => ({ ...prev, ...newInteractions }));
    setCommentMetrics((prev) => ({ ...prev, ...newMetrics }));
  };

  const handleLike = async () => {
    if (!restrictActionToLoggedInUsers("like")) return;

    const action = isLiked ? LikeService.unlike : LikeService.like;

    try {
      await action(commentId);

      updateCommentState(
        { isLiked: !isLiked },
        { likes: likes + (isLiked ? -1 : 1) }
      );
    } catch (error) {
      errorLiking(error);
    }
  };

  const actions = [
    {
      icon: <ThumbsUp />,
      onClick: handleLike,
      count: likes,
      active: isLiked,
    },
  ];

  return (
    <ul className="flex gap-6 mt-2 text-muted-foreground text-sm justify-end">
      {actions.map((action, index) => (
        <li
          key={index}
          className="flex items-center gap-2 cursor-pointer transition hover:text-primary"
          onClick={action.onClick}
        >
          <button
            onClick={action.onClick}
            type="button"
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-xl transition",
              action.active
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            {action.icon}
          </button>

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
