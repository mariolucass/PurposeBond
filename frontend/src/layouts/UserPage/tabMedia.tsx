import { PostComponent } from "@/components/post";
import { api } from "@/services/config/api";

import { useEffect, useState } from "react";

export const TabMedia = ({ userId }: { userId: string }) => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await api.get(`users/${userId}/media/`);
        setMedia(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedia();
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
      {media.map((e: any) => (
        <PostComponent post={e} key={e.id} />
      ))}
    </ul>
  );
};
