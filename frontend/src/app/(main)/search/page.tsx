"use client";

import { Navigator } from "@/components/navigator";
import { SearchProvider } from "@/contexts/search.context";
import { useSearchParams } from "next/navigation";
import { SearchForm } from "./formSearch";
import { TabsSearch } from "./tabsSearch";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("q");
  const typeParam = searchParams.get("type");

  return (
    <SearchProvider>
      <section className="w-full min-w-full flex flex-col justify-start">
        <Navigator
          name={"Search"}
          description={searchParam ? `${searchParam}` : "Search someting."}
        />

        <SearchForm query={searchParam} />

        <TabsSearch query={searchParam} type={typeParam} />
      </section>
    </SearchProvider>
  );
};

export default SearchPage;
