import { useCommentContext } from "@/contexts/comment.context";
import { usePostContext } from "@/contexts/post.context";
import { CommentCreateType } from "@/interfaces/comments.interfaces";
import { commentCreateSchema } from "@/lib/schemas/comments.schemas";
import { postComment } from "@/services/comments.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../components/ui/form";
import { Textarea } from "../../../../components/ui/textarea";

export const FormCreateComment = () => {
  const { currentPost } = usePostContext();
  const { setShouldFetchComments } = useCommentContext();

  const createComment = async (form: { content: string }) => {
    await postComment(currentPost!.id, form);
    setShouldFetchComments(true);
    commentFormMethods.reset();
  };

  const commentFormMethods = useForm<CommentCreateType>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: { content: "" },
  });

  return (
    <Form {...commentFormMethods}>
      <form
        onSubmit={commentFormMethods.handleSubmit(createComment)}
        className="min-w-full flex items-center justify-center"
      >
        <FormField
          control={commentFormMethods.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-9/12">
              <FormControl>
                <Textarea
                  placeholder="Write a comment."
                  {...field}
                  className="w-10/12"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Post</Button>
      </form>
    </Form>
  );
};
