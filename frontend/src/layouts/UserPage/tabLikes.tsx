import { PostComponent } from "@/components/post";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export const TabLikes = ({ userId }: { userId: string }) => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await api.get(`users/${userId}/likes/`);
        setLikes(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Post not found.</div>;
  }

  return (
    <ul>
      {likes.map((e: any) => (
        <PostComponent post={e} key={e.id} />
      ))}
    </ul>
  );
};
