import { usePostContext } from "@/contexts/post.context";
import { useEffect, useState } from "react";
import { api } from "../services/config/api";

const useFetchPost = (id: string) => {
  const { currentPost, setCurrentPost } = usePostContext();
  const [isLoadingCurrentPost, setisLoadingCurrentPost] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setCurrentPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error);
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

  return { isLoadingCurrentPost, error };
};

export default useFetchPost;
