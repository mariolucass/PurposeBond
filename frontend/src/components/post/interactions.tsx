import { useAuthContext } from "@/contexts/auth.context";
import { deleteLike, postLike } from "@/services/likes.services";
import { MessageSquare, Repeat2, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

interface PostInteractionsProps {
  postId: string;
  initialLikes: number;
  initialComments: number;
}

export const PostInteractions = ({
  postId,
  initialLikes,
  initialComments,
}: PostInteractionsProps) => {
  const { toast } = useToast();
  const {
    authenticatedUser,
    getLikesForAuthenticatedUser,
    getRepostsForAuthenticatedUser,
  } = useAuthContext();

  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  const [likeCount, setLikeCount] = useState(initialLikes);
  const [repostCount, setRepostCount] = useState(initialLikes);

  useEffect(() => {
    const checkInteractionStatus = async () => {
      if (authenticatedUser) {
        const postLiked = authenticatedUser.likes.some(
          (like: any) => like.post.id === postId
        );
        setIsLiked(postLiked);

        const postReposted = authenticatedUser.reposts.some(
          (repost: any) => repost.post.id === postId
        );
        setIsReposted(postReposted);
      }
    };

    if (authenticatedUser) {
      checkInteractionStatus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = async () => {
    if (!authenticatedUser) {
      toast({ title: "You must be logged in to like." });
      return;
    }

    try {
      if (isLiked) {
        await deleteLike(postId);
        setLikeCount(likeCount - 1);
      } else {
        await postLike(postId);
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      toast({
        title: "Something went wrong.",
        description: "There was an error liking/unliking the post.",
      });
    }
  };

  const handleRepost = async () => {
    if (!authenticatedUser) {
      toast({ title: "You must be logged in to repost." });
      return;
    }
  };

  return (
    <div className="self-end flex gap-2">
      {isLiked ? (
        <ThumbsUp fill="#4d7a86" onClick={() => handleLike()} />
      ) : (
        <ThumbsUp onClick={() => handleLike()} />
      )}
      <h2>{likeCount}</h2>

      <MessageSquare />

      {isReposted ? (
        <Repeat2 fill="#4d7a86" onClick={() => handleLike()} />
      ) : (
        <Repeat2 onClick={() => handleLike()} />
      )}
      <h2>{repostCount}</h2>

      <h2>{initialComments}</h2>
    </div>
  );
};
