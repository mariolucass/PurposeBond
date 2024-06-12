import { ChildrenInterface } from "@/interfaces/global.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ISearchContext {
  search: string | null;
  setSearch: Dispatch<SetStateAction<string | null>>;
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext);

export const SearchProvider = ({ children }: ChildrenInterface) => {
  const [search, setSearch] = useState<string | null>(null);

  const [resultPosts, setResultPosts] = useState([]);

  const fetchPostsSearch = () => {
    if (resultPosts.length) {
      return resultPosts;
    }
  };
  const [resultUsers, setResultUsers] = useState([]);
  const fetchUsersSearch = () => {};
  const [resultPopular, setResultPopular] = useState([]);
  const fetchPopularSearch = () => {};
  const [resultMedia, setResultMedia] = useState([]);
  const fetchMediaSearch = () => {};

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
