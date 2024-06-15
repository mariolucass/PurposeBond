import { useAuthContext } from "@/contexts/auth.context";

export const PostMenuOptions = () => {
  const { authenticatedUser } = useAuthContext();

  return <div></div>;
};
