"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostReturnInterface } from "@/interfaces/posts.interfaces";
import { api } from "@/services/api";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";

interface PostPageProps {
  params: { id: string };
}

const PostPage = ({ params: { id } }: PostPageProps) => {
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
    <section className="border-x-4 gap-4 w-4/6 flex flex-col justify-start">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col space-y-4">
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
        </div>
      </div>

      <Separator />

      <div className="w-full flex justify-center">
        <div className="w-11/12 flex self-center">
          <Input type="comment" placeholder="Comentario" />
          <Button type="submit">Comentar</Button>
        </div>
      </div>
    </section>
  );
};

export default PostPage;
