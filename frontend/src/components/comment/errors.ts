import { toast } from "../ui/use-toast";

export const errorReposting = (error: unknown) => {
  console.error("Error reposting/unreposting comment:", error);

  toast({
    title: "Something went wrong.",
    description: "There was an error reposting/unreposting the comment.",
  });
};

export const errorLiking = (error: unknown) => {
  console.error("Error liking/unliking comment:", error);
  toast({
    title: "Something went wrong.",
    description: "There was an error liking/unliking the comment.",
  });
};
