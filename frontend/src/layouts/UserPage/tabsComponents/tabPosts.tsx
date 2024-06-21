import { EmptyPosts } from "@/components/_emptyComponents/emptyPosts";
import { LoadingComponent } from "@/components/loading";
import { PostComponent } from "@/components/post";
import { Separator } from "@/components/ui/separator";
import { PostInterface } from "@/interfaces/posts.interfaces";
import { ApiError } from "@/services/config/apiError";
import { getPostsByUser } from "@/services/posts.services";
import Error from "next/error";
import { Fragment, useEffect, useState } from "react";

interface TabPostsProps {
  user: {
    id: string;
    username: string;
  };
}

export const TabPosts = ({ user }: TabPostsProps) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [errorCode, setErrorCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostsByUser(user.id);
        setPosts(fetchedPosts);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return posts.length ? (
    <ul className="flex flex-col gap-4 w-full">
      {posts.map((e: any, index) => (
        <Fragment key={e.id}>
          <PostComponent post={e} key={e.id} />
          {index !== posts.length - 1 && <Separator />}
        </Fragment>
      ))}
    </ul>
  ) : (
    <EmptyPosts username={user.username} />
  );
};
