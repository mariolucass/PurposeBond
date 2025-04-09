import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { PostService } from "@/services/posts.services";
import { useEffect, useState } from "react";

export const useFetchPost = (id: string) => {
  const { currentPost, setCurrentPost } = usePostContext();

  const [isLoadingCurrentPost, setisLoadingCurrentPost] = useState(true);
  const [fetchPostError, setFetchPostError] = useState<null | unknown>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        setCurrentPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
        setFetchPostError(error);
      } finally {
        setisLoadingCurrentPost(false);
      }
    };

    if (!currentPost || currentPost.id !== id) {
      fetchPost();
    } else {
      setisLoadingCurrentPost(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoadingCurrentPost, fetchPostError };
};
