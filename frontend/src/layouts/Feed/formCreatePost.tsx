import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { PostCreateType } from "@/interfaces/posts.interfaces";
import { postCreateSchema } from "@/lib/schemas/posts.schemas";
import { PostService } from "@/services/posts.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyboardEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../components/ui/form";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

export const FormCreatePost = () => {
  const { setPosts } = usePostContext();
  const [isMentioning, setIsMentioning] = useState(false);

  const createPost = async (form: { content: string }) => {
    const newPost = await PostService.create(form);
    setPosts((prev) => [newPost, ...prev]);
  };

  const postFormMethods = useForm<PostCreateType>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: { content: "" },
  });

  const verifyIsMentioning = (event: any) => {
    const keyPressed = event.nativeEvent.key;
    if (keyPressed === "@") setIsMentioning(true);
    else if (keyPressed === " " && isMentioning) setIsMentioning(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    verifyIsMentioning(event);
    if (event.nativeEvent.key === "@") {
      const oldValue = postFormMethods.getValues("content");
      postFormMethods.setValue("content", oldValue + "@Mario");
    }
  };

  return (
    <Form {...postFormMethods}>
      <form
        onSubmit={postFormMethods.handleSubmit(createPost)}
        className="w-full flex flex-col gap-4 px-6 py-4 border-b border-border bg-background"
      >
        <FormField
          control={postFormMethods.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <Label
                htmlFor="postCreate"
                className="text-sm font-medium text-muted-foreground"
              >
                Your new post
              </Label>
              <FormControl>
                <Textarea
                  placeholder="Type your post here..."
                  id="postCreate"
                  onKeyUp={handleKeyDown}
                  className="resize-none min-h-[120px] rounded-md border border-border bg-muted/20 p-3 text-sm focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none transition-all"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="w-28">
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};
