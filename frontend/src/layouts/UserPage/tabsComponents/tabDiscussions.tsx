import { EmptyDiscussions } from "@/components/_emptyComponents/emptyDiscussions";
import { CommentComponent } from "@/components/comment";
import { LoadingComponent } from "@/components/common/loading";
import { CommentService } from "@/services/comments.services";
import { ApiError } from "@/services/config/apiError";
import Error from "next/error";
import { useEffect, useState } from "react";
import { TabProps } from "./interfaces";

export const TabDiscussions = ({ user }: TabProps) => {
  const [discussions, setDiscussions] = useState<any>([]);
  const [errorCode, setErrorCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const fetchedDiscussions = await CommentService.getByUser(user.id);

        setDiscussions(fetchedDiscussions);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (!discussions.length) {
    return <EmptyDiscussions username={user.username} />;
  }

  return (
    <ul className="flex flex-col gap-4 w-full">
      {discussions.map((e: any) => (
        <CommentComponent comment={e} key={e.id} />
      ))}
    </ul>
  );
};
