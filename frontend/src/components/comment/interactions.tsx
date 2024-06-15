import { useAuthContext } from "@/contexts/auth.context";
import { deleteLike, postLike } from "@/services/likes.services";
import { deleteRepost, postRepost } from "@/services/reposts.services";
import { MessageSquare, Repeat2, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { errorLiking, errorReposting } from "./errors";

export interface CommentInteractionsProps {
  commentId: string;
  count: {
    comments: number;
    likes: number;
    reposts: number;
  };
}

export interface InteractionsState {
  isLiked: boolean;
  isReposted: boolean;
}

export interface CommentMetricsState {
  likes: number;
  reposts: number;
  comments: number;
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
    reposts: count.reposts,
    comments: count.comments,
  });
  const { likes, comments, reposts } = commentMetrics;

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
        isLiked: likes.some((elem: any) => elem.id === commentId),
        isReposted: reposts.some((elem: any) => elem.id === commentId),
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

    const action = isLiked ? deleteLike : postLike;

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

  const handleRepost = async () => {
    if (!restrictActionToLoggedInUsers("repost")) return;

    const action = isReposted ? deleteRepost : postRepost;

    try {
      await action(commentId);

      updateCommentState(
        { isReposted: !isReposted },
        { reposts: reposts + (isReposted ? -1 : 1) }
      );
    } catch (error) {
      errorReposting(error);
    }
  };

  const handleComment = async () => {
    if (!restrictActionToLoggedInUsers("repost")) return;
  };

  return (
    <div className="flex gap-4 items-center">
      <button
        className="flex flex-col justify-center items-center"
        onClick={handleLike}
      >
        <ThumbsUp fill={isLiked ? "#4d7a86" : "none"} />
        <h2>{likes}</h2>
      </button>

      <button
        className="flex flex-col justify-center items-center"
        onClick={handleRepost}
      >
        <Repeat2 fill={isReposted ? "#4d7a86" : "none"} />
        <h2>{reposts}</h2>
      </button>

      <button
        className="flex flex-col justify-center items-center"
        onClick={handleComment}
      >
        <MessageSquare />
        <h2>{comments}</h2>
      </button>
    </div>
  );
};
