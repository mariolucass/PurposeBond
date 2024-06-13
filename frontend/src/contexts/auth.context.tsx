import { toast } from "@/components/ui/use-toast";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import {
  getProfileComments,
  getProfileDiscussions,
  getProfileFollowers,
  getProfileFollowing,
  getProfileLikes,
  getProfilePosts,
  getProfileReposts,
} from "@/services/profile.services";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  authenticatedUser: any | null;
  setAuthenticatedUser: Dispatch<SetStateAction<any | null>>;
  restrictActionToLoggedInUsers: (interaction?: string) => boolean;

  getLikesForAuthenticatedUser: () => Promise<any>;
  getPostsForAuthenticatedUser: () => Promise<any>;
  getCommentsForAuthenticatedUser: () => Promise<any>;
  getDiscussionsForAuthenticatedUser: () => Promise<any>;
  getRepostsForAuthenticatedUser: () => Promise<any>;
  getFollowersForAuthenticatedUser: () => Promise<any>;
  getFollowingForAuthenticatedUser: () => Promise<any>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: ChildrenInterface) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<any | null>(null);

  useEffect(() => {});

  const getProfileData = async (
    propertyName: keyof any,
    fetchFunction: () => Promise<any[]>
  ) => {
    if (authenticatedUser && authenticatedUser[propertyName]) {
      return authenticatedUser[propertyName] as any[];
    }

    const data = await fetchFunction();
    setAuthenticatedUser((user: any) => ({ ...user, [propertyName]: data }));
    return data;
  };

  const getLikesForAuthenticatedUser = async () =>
    getProfileData("likes", getProfileLikes) as Promise<any[]>;

  const getPostsForAuthenticatedUser = async () =>
    getProfileData("posts", getProfilePosts) as Promise<any[]>;

  const getCommentsForAuthenticatedUser = async () =>
    getProfileData("comments", getProfileComments) as Promise<any[]>;

  const getDiscussionsForAuthenticatedUser = async () =>
    getProfileData("discussions", getProfileDiscussions) as Promise<any[]>;

  const getRepostsForAuthenticatedUser = async () =>
    getProfileData("reposts", getProfileReposts) as Promise<any[]>;

  const getFollowersForAuthenticatedUser = async () =>
    getProfileData("followers", getProfileFollowers) as Promise<any[]>;

  const getFollowingForAuthenticatedUser = async () =>
    getProfileData("following", getProfileFollowing) as Promise<any[]>;

  const restrictActionToLoggedInUsers = (interaction: string = "interact") => {
    if (!authenticatedUser) {
      toast({ title: `You must be logged in to ${interaction}.` });
      return false;
    }

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser,
        restrictActionToLoggedInUsers,

        getLikesForAuthenticatedUser,
        getPostsForAuthenticatedUser,
        getRepostsForAuthenticatedUser,
        getCommentsForAuthenticatedUser,
        getDiscussionsForAuthenticatedUser,
        getFollowersForAuthenticatedUser,
        getFollowingForAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
