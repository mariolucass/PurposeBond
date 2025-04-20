import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { CommentCreateType } from "@/interfaces/comments.interfaces";
import { commentCreateSchema } from "@/lib/schemas/comments.schemas";
import { CommentService } from "@/services/comments.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../components/ui/form";
import { Textarea } from "../../components/ui/textarea";

export const FormCreateComment = ({ comments, setComments }: any) => {
  const { currentPost } = usePostContext();

  const createComment = async (form: { content: string }) => {
    const newComment = await CommentService.create(currentPost!.id, form);
    setComments((prev: any) => [...prev, newComment]);
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
        className=" h-component2x min-w-full flex items-center justify-center border-b-2"
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
                  className="w-11/12 resize-none min-h-[120px] rounded-md border border-border bg-muted/20 p-3 text-sm focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none transition-all"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Comment</Button>
      </form>
    </Form>
  );
};
