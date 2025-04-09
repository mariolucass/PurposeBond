import { EmptyPosts } from "@/components/_emptyComponents/emptyPosts";
import { LoadingComponent } from "@/components/common/loading";
import { PostComponent } from "@/components/post";
import { PostInterface } from "@/interfaces/posts.interfaces";
import { ApiError } from "@/services/config/apiError";
import { PostService } from "@/services/posts.services";
import Error from "next/error";
import { useEffect, useState } from "react";
import { TabProps } from "./interfaces";

export const TabPosts = ({ user }: TabProps) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [errorCode, setErrorCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await PostService.getByUser(user.id);
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
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (!posts.length) {
    return <EmptyPosts username={user.username} />;
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {posts.map((e: any) => (
        <PostComponent post={e} key={e.id} />
      ))}
    </ul>
  );
};
