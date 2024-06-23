"use client";

import { Navigator } from "@/components/navigator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchProvider } from "@/contexts/search.context";
import { SearchResults } from "@/layouts/Search/resultsSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SearchForm } from "./formSearch";

type SearchType = "latest" | "popular" | "media" | "users";

const SearchPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const type = searchParams.get("type");

  const [currentType, setCurrentType] = useState<SearchType>(
    type ? (type as SearchType) : "popular"
  );

  const tabTypes: SearchType[] = ["popular", "latest", "users", "media"];

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const tabs = query
    ? tabTypes.map((typeElem) => ({
        name: typeElem,
        component: query && <SearchResults query={query} type={currentType} />,
      }))
    : [];

  const handleSearchTypeChange = (name: string) => {
    setCurrentType(name as SearchType);
    router.push(pathname + "?" + createQueryString("type", name));
  };

  return (
    <SearchProvider>
      <section className="w-full min-w-full flex flex-col justify-start">
        <Navigator name={"Search"} />

        <SearchForm query={query} />

        <Tabs
          defaultValue={type ? type : "popular"}
          className="min-w-full flex flex-col items-center p-4"
        >
          <TabsList className="w-full flex justify-between p-4 ">
            {tabs.map((item) => (
              <TabsTrigger
                value={item.name}
                key={item.name}
                onClick={() => handleSearchTypeChange(item.name)}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((item) => (
            <TabsContent value={item.name} key={item.name} className="w-full">
              {item.component}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </SearchProvider>
  );
};

export default SearchPage;
