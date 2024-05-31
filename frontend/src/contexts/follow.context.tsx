import { ChildrenInterface } from "@/interfaces/global.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IFollowContext {
  followedBy: never[];
  setFollowedBy: Dispatch<SetStateAction<never[]>>;

  following: never[];
  setFollowing: Dispatch<SetStateAction<never[]>>;
}

const FollowContext = createContext<IFollowContext>({} as IFollowContext);

export const FollowProvider = ({ children }: ChildrenInterface) => {
  const [followedBy, setFollowedBy] = useState([]);
  const [following, setFollowing] = useState([]);

  return (
    <FollowContext.Provider
      value={{ followedBy, setFollowedBy, following, setFollowing }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export const useFollowContext = () => useContext(FollowContext);
