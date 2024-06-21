import { usePostContext } from "@/contexts/post.context";
import { PostCreateType } from "@/interfaces/posts.interfaces";
import { postCreateSchema } from "@/lib/schemas/posts.schemas";
import { postPost } from "@/services/posts.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const FormCreatePost = () => {
  const { setShouldFetchPosts } = usePostContext();

  const createPost = async (form: { content: string }) => {
    await postPost(form);
    setShouldFetchPosts(true);
    postFormMethods.reset();
  };

  const postFormMethods = useForm<PostCreateType>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: { content: "" },
  });

  return (
    <Form {...postFormMethods}>
      <form
        onSubmit={postFormMethods.handleSubmit(createPost)}
        className="flex flex-col w-full gap-2 p-6"
      >
        <FormField
          control={postFormMethods.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <>
                  <Label htmlFor="postCreate" className="font-bold ml-2">
                    Your post
                  </Label>
                  <Textarea
                    placeholder="Type your post here."
                    id="postCreate"
                    {...field}
                  />
                </>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-1/3 self-end">
          Post
        </Button>
      </form>
    </Form>
  );
};
