"use client";

import { Navigator } from "@/components/common/navigator";
import { SearchForm } from "@/layouts/Forms/formSearch";
import { TabsSearch } from "@/layouts/SearchPage/tabsSearch";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("q");
  const typeParam = searchParams.get("type");

  return (
    <section className="w-full min-w-full flex flex-col justify-start">
      <Navigator
        name={"Search"}
        description={searchParam ? `${searchParam}` : "Search someting."}
      />

      <SearchForm query={searchParam} type={typeParam} />

      <TabsSearch searchParams={searchParams} />
    </section>
  );
};

export default SearchPage;
