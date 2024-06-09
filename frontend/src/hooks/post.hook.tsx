import { usePostContext } from "@/contexts/post.context";
import { useEffect, useState } from "react";
import { api } from "../services/config/api";

export const useFetchPost = (id: string) => {
  const { currentPost, setCurrentPost } = usePostContext();
  const [isLoadingCurrentPost, setisLoadingCurrentPost] = useState(true);
  const [fetchPostError, setFetchPostError] = useState<null | unknown>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setCurrentPost(response.data);
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
