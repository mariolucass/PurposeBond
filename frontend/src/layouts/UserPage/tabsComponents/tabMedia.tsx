import { EmptyMedia } from "@/components/_emptyComponents/emptyMedia";
import { LoadingComponent } from "@/components/loading";
import { PostComponent } from "@/components/post";
import { ApiError } from "@/services/config/apiError";
import { getMediaByUser } from "@/services/posts.services";
import { useEffect, useState } from "react";
import { TabProps } from "./interfaces";

export const TabMedia = ({ user }: TabProps) => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const fetchedMedia = await getMediaByUser(user.id);
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
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Post not found.</div>;
  }

  if (!media.length) {
    return <EmptyMedia username={user.username} />;
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {media.map((e: any) => (
        <PostComponent post={e} key={e.id} />
      ))}
    </ul>
  );
};
