"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostReturnInterface } from "@/interfaces/posts.interfaces";
import { api } from "@/services/api";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { useEffect, useState } from "react";

interface CommentPageProps {
  params: { id: string };
}

const CommentPage = ({ params: { id } }: CommentPageProps) => {
  const [post, setPost] = useState<PostReturnInterface>(
    {} as PostReturnInterface
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <li className="flex flex-col space-y-4">
        <div className="flex items-center">
          <Avatar className="mr-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              {post && handleDateWithMoment(post.createdAt)}
            </h2>
            <p className="text-gray-600">{post.author.username}</p>
          </div>
        </div>
        <p className="text-gray-800">{post.content}</p>
      </li>
    </div>
  );
};

export default CommentPage;
