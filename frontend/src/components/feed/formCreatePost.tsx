import { usePostContext } from "@/contexts/post.context";
import { PostCreateType } from "@/interfaces/posts.interfaces";
import { postCreateSchema } from "@/lib/schemas/posts.schemas";
import { postPost } from "@/services/posts.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const FormCreatePost = () => {
  const { setShouldFetchPosts } = usePostContext();

  const [isMentioning, setIsMentioning] = useState(false);

  useEffect(() => {}, [isMentioning]);

  const createPost = async (form: { content: string }) => {
    await postPost(form);
    setShouldFetchPosts(true);
    postFormMethods.reset();
  };

  const postFormMethods = useForm<PostCreateType>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: { content: "" },
  });

  const verifyIsMentioning = (event: any) => {
    const keyPressed = event.nativeEvent.key;

    if (keyPressed === "@") {
      setIsMentioning(true);
    } else if (keyPressed === " " && isMentioning) {
      setIsMentioning(false);
    }
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
        className="flex flex-col w-full gap-4 p-6"
      >
        <FormField
          control={postFormMethods.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <>
                  <Label htmlFor="postCreate" className="font-bold ml-2">
                    Your new post
                  </Label>
                  <Textarea
                    placeholder="Type your post here."
                    id="postCreate"
                    onKeyUp={handleKeyDown}
                    {...field}
                  />
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-3/12 self-end">
          Post
        </Button>
      </form>
    </Form>
  );
};
