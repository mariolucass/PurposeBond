import { PostInterface } from "@/interfaces/posts.interfaces";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { PostAuthorInfo } from "./authorInfo";
import { PostInteractions } from "./interactions";

interface PostProps {
  post: PostInterface;
  pageType?: "dashboard" | "profile" | "postPage";
}

export const PostComponent = ({ post, pageType }: any) => {
  const router = useRouter();

  const postContentRef = useRef<HTMLDivElement>(null);
  const authorInfoRef = useRef<HTMLDivElement>(null);
  const interactionsRef = useRef<HTMLDivElement>(null);

  const handlePostContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const userHasClickedOutsideInteractionsAndAuthor =
      interactionsRef.current?.contains(event.target as Node) ||
      authorInfoRef.current?.contains(event.target as Node);

    if (!userHasClickedOutsideInteractionsAndAuthor) {
      router.push(`/posts/${post.id}`);
    }
  };

  const handleAuthorInfoClick = () => {
    console.log("Author info clicked (navigating to user profile...)");
  };

  const handleInteractionsClick = () => {
    console.log("Interactions clicked (handling interactions logic...)");
  };

  return (
    <Fragment key={post.id}>
      <div
        className="flex-col w-full p-6 bg-white rounded-lg"
        onClick={handlePostContentClick}
        ref={postContentRef}
      >
        <div className="flex flex-col gap-4 ">
          <div ref={authorInfoRef} onClick={handleAuthorInfoClick}>
            <PostAuthorInfo author={post.author} createdAt={post.createdAt} />
          </div>

          <p className="text-gray-800 max-w-64">{post.content}</p>

          <div
            ref={interactionsRef}
            onClick={handleInteractionsClick}
            className="self-end flex gap-2"
          >
            <PostInteractions
              postId={post.id}
              initialComments={post._count.comments}
              initialLikes={post._count.likes}
              initialReposts={post._count.reposts}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
