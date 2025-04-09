"use client";

import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Results {
  latest: never[];
  popular: never[];
  media: never[];
  users: never[];
}

export type SearchType = "latest" | "popular" | "media" | "users";
interface ISearchContext {
  currentSearch: string | null;
  setCurrentSearch: Dispatch<SetStateAction<string | null>>;

  currentType: SearchType | null;
  setCurrentType: Dispatch<SetStateAction<SearchType | null>>;

  results: Results;
  setResults: Dispatch<SetStateAction<Results>>;
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext);

export const SearchProvider = ({ children }: ChildrenInterface) => {
  const searchParams = useSearchParams();

  const [searchParam, setSearchParam] = useState(searchParams.get("q"));
  const [typeParam, setTypeParam] = useState(searchParams.get("type"));

  useEffect(() => {
    setCurrentSearch(searchParam);
    setCurrentType(typeParam as SearchType);
  });

  const [currentSearch, setCurrentSearch] = useState<string | null>(null);
  const [currentType, setCurrentType] = useState<SearchType | null>("popular");
  const [results, setResults] = useState<Results>({
    latest: [],
    popular: [],
    media: [],
    users: [],
  });

  return (
    <SearchContext.Provider
      value={{
        currentSearch,
        setCurrentSearch,

        currentType,
        setCurrentType,

        results,
        setResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
