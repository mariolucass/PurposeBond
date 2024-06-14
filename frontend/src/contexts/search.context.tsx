import { ChildrenInterface } from "@/interfaces/global.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface Results {
  latest: never[];
  popular: never[];
  media: never[];
  users: never[];
}
interface ISearchContext {
  search: string | null;
  setSearch: Dispatch<SetStateAction<string | null>>;

  results: Results;
  setResults: Dispatch<SetStateAction<Results>>;
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext);

export const SearchProvider = ({ children }: ChildrenInterface) => {
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<Results>({
    latest: [],
    popular: [],
    media: [],
    users: [],
  });

  return (
    <SearchContext.Provider value={{ search, setSearch, results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
