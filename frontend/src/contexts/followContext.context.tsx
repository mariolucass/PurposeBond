import { IChildren } from "@/interfaces/global.interfaces";
import { createContext, useContext } from "react";

interface IFollowContext {
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  loadFollowing: (userId: string) => void;
  loadFollowers: (userId: string) => void;
}

const FollowContext = createContext<IFollowContext>({} as IFollowContext);

export const FollowProvider = ({ children }: IChildren) => {
  const followUser = (userId: string) => {};

  const unfollowUser = (userId: string) => {};

  const loadFollowing = (userId: string) => {};

  const loadFollowers = (userId: string) => {};

  return (
    <FollowContext.Provider
      value={{ followUser, loadFollowers, loadFollowing, unfollowUser }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export const useFollowContext = () => useContext(FollowContext);
