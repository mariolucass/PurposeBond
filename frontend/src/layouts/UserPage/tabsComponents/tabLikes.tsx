import { EmptyLikes } from "@/components/_emptyComponents/emptyLikes";
import { LoadingComponent } from "@/components/common/loading";
import { PostComponent } from "@/components/post";
import { ApiError } from "@/services/config/apiError";
import { LikeService } from "@/services/likes.services";
import { useEffect, useState } from "react";
import { TabProps } from "./interfaces";

export const TabLikes = ({ user }: TabProps) => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const fetchedLikes = await LikeService.getByUser(user.id);
        setLikes(fetchedLikes);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Post not found.</div>;
  }

  if (!likes.length) {
    return <EmptyLikes username={user.username} />;
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {likes.map((e: any) => (
        <PostComponent post={e} key={e.id} />
      ))}
    </ul>
  );
};
