"use client";

import { CommentComponent } from "@/components/comment";
import { PostComponent } from "@/components/post";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { usePostContext } from "@/contexts/post.context";
import useFetchPost from "@/hooks/post.hook";
import {
  CommentCreateType,
  CommentInterface,
} from "@/interfaces/comments.interfaces";
import { commentCreateSchema } from "@/lib/schemas/comments.schemas";
import { getCommentsByPost, postComment } from "@/services/comments.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface PostPageProps {
  params: { id: string };
}
interface Comment {
  content: string;
}

const PostPage = ({ params: { id } }: PostPageProps) => {
  const { isLoadingCurrentPost, error } = useFetchPost(id);
  const { currentPost } = usePostContext();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentInterface[]>(
    [] as CommentInterface[]
  );

  const form = useForm<Comment>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedComments = await getCommentsByPost(id);
        setComments(fetchedComments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingCurrentPost) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Post not found.</div>;
  }

  const createComment = async (data: CommentCreateType) => {
    await postComment(id, data);
    form.reset();
  };

  return (
    <section className="gap-4 w-full flex flex-col justify-start">
      <PostComponent post={currentPost} />

      <Separator />

      <div className="w-full flex p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createComment)}
            className="min-w-full flex justify-evenly"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-9/12">
                  <FormControl>
                    <Input placeholder="Write a comment" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <ul className="flex flex-col">
        <Separator className="mb-0" />
        {comments.map((e: CommentInterface, index) => (
          <Fragment key={e.id}>
            <CommentComponent comment={e} postId={currentPost.id} />
            {index !== comments.length - 1 && <Separator />}
          </Fragment>
        ))}
      </ul>
    </section>
  );
};

export default PostPage;
