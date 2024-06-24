import { useAuthContext } from "@/contexts/auth.context";
import { deleteLike, postLike } from "@/services/likes.services";
import { deleteRepost, postRepost } from "@/services/reposts.services";
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

export const PostInteractions = ({ postId, count }: PostInteractionsProps) => {
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

    const action = isLiked ? deleteLike : postLike;

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

    const action = isReposted ? deleteRepost : postRepost;

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

  const spanClass = "self-center font-semibold mt-2";

  return (
    <div className="flex gap-4">
      <div className="flex flex-col justify-center">
        <Button className="w-[48px]" onClick={handleLike}>
          <ThumbsUp fill={isLiked ? "#4d7a86" : "none"} />
        </Button>

        <span
          className={isLiked ? `${spanClass} text-[#4d7a86]` : `${spanClass}`}
        >
          {likes}
        </span>
      </div>

      <div className="flex flex-col justify-center">
        <Button className="w-[48px]" onClick={handleRepost}>
          <Repeat2 fill={isReposted ? "#4d7a86" : "none"} />
        </Button>

        <span
          className={
            isReposted ? `${spanClass} text-[#4d7a86]` : `${spanClass}`
          }
        >
          {reposts}
        </span>
      </div>

      <div className="flex flex-col justify-center">
        <Button className="w-[48px]">
          <MessageSquare />
        </Button>

        <span className={`${spanClass}`}>{comments}</span>
      </div>
    </div>
  );
};
