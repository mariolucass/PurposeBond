import { EmptyLikes } from "@/components/_emptyComponents/emptyLikes";
import { LoadingComponent } from "@/components/loading";
import { PostComponent } from "@/components/post";
import { Separator } from "@/components/ui/separator";
import { ApiError } from "@/services/config/apiError";
import { getLikesByUser } from "@/services/likes.services";
import { Fragment, useEffect, useState } from "react";

interface TabLikesProps {
  user: {
    id: string;
    username: string;
  };
}

export const TabLikes = ({ user }: TabLikesProps) => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const fetchedLikes = await getLikesByUser(user.id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Post not found.</div>;
  }

  return likes.length ? (
    <ul className="flex flex-col gap-4 w-full">
      {likes.map((e: any, index) => (
        <Fragment key={e.id}>
          <PostComponent post={e} key={e.id} />
          {index !== likes.length - 1 && <Separator />}
        </Fragment>
      ))}
    </ul>
  ) : (
    <EmptyLikes username={user.username} />
  );
};
