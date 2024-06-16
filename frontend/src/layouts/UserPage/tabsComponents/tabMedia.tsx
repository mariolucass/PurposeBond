import { LoadingComponent } from "@/components/loading";
import { PostComponent } from "@/components/post";
import { Separator } from "@/components/ui/separator";
import { ApiError } from "@/services/config/apiError";
import { getMediaByUser } from "@/services/posts.services";
import { Fragment, useEffect, useState } from "react";

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
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Post not found.</div>;
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {media.map((e: any, index) => (
        <Fragment key={e.id}>
          <PostComponent post={e} key={e.id} />
          {index !== media.length - 1 && <Separator />}
        </Fragment>
      ))}
    </ul>
  );
};
