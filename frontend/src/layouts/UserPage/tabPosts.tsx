import { PostComponent } from "@/components/post";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export const TabPosts = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`users/${userId}/posts/`);
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(true);
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

  if (error) {
    return <div>Post not found.</div>;
  }

  return (
    <ul>
      {posts.map((e: any) => (
        <PostComponent post={e} key={e.id} />
      ))}
    </ul>
  );
};
