import { toast } from "../ui/use-toast";

export const errorReposting = (error: unknown) => {
  console.error("Error reposting/unreposting post:", error);

  toast({
    title: "Something went wrong.",
    description: "There was an error reposting/unreposting the post.",
  });
};

export const errorLiking = (error: unknown) => {
  console.error("Error liking/unliking post:", error);

  toast({
    title: "Something went wrong.",
    description: "There was an error liking/unliking the post.",
  });
};
