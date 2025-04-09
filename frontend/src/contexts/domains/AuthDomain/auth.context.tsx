"use client";

import { toast } from "@/components/ui/use-toast";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { api } from "@/services/config/api";
import { ProfileService } from "@/services/profile.services";

import { useRouter } from "next/navigation";
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
  verifyOwnership: (userId: string) => boolean;

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
  const router = useRouter();
  const [authenticatedUser, setAuthenticatedUser] = useState<any | null>(null);

  useEffect(() => {
    const autoLogin = async () => {
      const token = localStorage.getItem("tokenRedeSocial");
      if (token) {
        try {
          const response = await api.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAuthenticatedUser(response.data);
        } catch (error) {
          localStorage.removeItem("tokenRedeSocial");
          router.push("/login");
          toast({
            title: "Something went wrong.",
            description:
              "There was an error in autologin, please do login again.",
          });
        }
      }
    };
    autoLogin();
  }, []);

  const getProfileData = async (
    propertyName: keyof any,
    fetchFunction: () => Promise<any[]>
  ) => {
    const hasNotPropertyInAuthenticatedUser =
      !authenticatedUser.hasOwnProperty(propertyName);

    if (!authenticatedUser || hasNotPropertyInAuthenticatedUser) {
      const data = await fetchFunction();
      setAuthenticatedUser((user: any) => ({ ...user, [propertyName]: data }));
      return data;
    }

    const newCountProperty: any = await ProfileService.getCountByProperty(
      propertyName as string
    );

    const hasDifferenceinCountProperty =
      newCountProperty[propertyName] !== authenticatedUser[propertyName].length;

    if (hasDifferenceinCountProperty) {
      const data = await fetchFunction();
      setAuthenticatedUser((user: any) => ({ ...user, [propertyName]: data }));
      return data;
    }

    return authenticatedUser[propertyName];
  };

  const restrictActionToLoggedInUsers = (interaction: string = "interact") => {
    if (!authenticatedUser) {
      toast({ title: `You must be logged in to ${interaction}.` });
      return false;
    }
    return true;
  };

  const verifyOwnership = (authorId: string) => {
    return Boolean(authenticatedUser && authenticatedUser.id === authorId);
  };

  const getLikesForAuthenticatedUser = async () =>
    getProfileData("likes", ProfileService.getLikes) as Promise<any[]>;

  const getPostsForAuthenticatedUser = async () =>
    getProfileData("posts", ProfileService.getPosts) as Promise<any[]>;

  const getCommentsForAuthenticatedUser = async () =>
    getProfileData("comments", ProfileService.getComments) as Promise<any[]>;

  const getDiscussionsForAuthenticatedUser = async () =>
    getProfileData("discussions", ProfileService.getDiscussions) as Promise<
      any[]
    >;

  const getRepostsForAuthenticatedUser = async () =>
    getProfileData("reposts", ProfileService.getReposts) as Promise<any[]>;

  const getFollowersForAuthenticatedUser = async () =>
    getProfileData("followers", ProfileService.getFollowers) as Promise<any[]>;

  const getFollowingForAuthenticatedUser = async () =>
    getProfileData("following", ProfileService.getFollowing) as Promise<any[]>;

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser,
        restrictActionToLoggedInUsers,
        verifyOwnership,

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
