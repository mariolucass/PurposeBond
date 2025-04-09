"use client";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IFollowContext {
  followers: never[];
  setFollowers: Dispatch<SetStateAction<never[]>>;

  following: any[];
  setFollowing: Dispatch<SetStateAction<never[]>>;
}

const FollowContext = createContext<IFollowContext>({} as IFollowContext);

export const FollowProvider = ({ children }: ChildrenInterface) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  return (
    <FollowContext.Provider
      value={{ followers, setFollowers, following, setFollowing }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export const useFollowContext = () => useContext(FollowContext);
