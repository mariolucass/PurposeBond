import { PostComponent } from "@/components/post";
import { Separator } from "@/components/ui/separator";
import { PostInterface } from "@/interfaces/posts.interfaces";
import { ApiError } from "@/services/config/apiError";
import { getPostsByUser } from "@/services/posts.services";
import Error from "next/error";
import { Fragment, useEffect, useState } from "react";

export const TabPosts = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostsByUser(userId);
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
    return <div>Loading...</div>;
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {posts.map((e: any, index) => (
        <Fragment key={e.id}>
          <PostComponent post={e} key={e.id} />
          {index !== posts.length - 1 && <Separator />}
        </Fragment>
      ))}
    </ul>
  );
};
