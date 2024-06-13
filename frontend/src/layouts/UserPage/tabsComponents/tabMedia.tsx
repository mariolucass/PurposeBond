import { PostComponent } from "@/components/post";
import { ApiError } from "@/services/config/apiError";
import { getMediaByUser } from "@/services/posts.services";

import { useEffect, useState } from "react";

export const TabMedia = ({ userId }: { userId: string }) => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const fetchedMedia = await getMediaByUser(userId);
        setMedia(fetchedMedia);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(error);
        }
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
