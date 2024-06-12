"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SearchForm } from "./formSearch";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    { name: "hot" },
    { name: "posts" },
    { name: "users" },
    { name: "media" },
  ];

  return (
    <section className="w-full min-w-full flex flex-col gap-4 justify-start p-4">
      <SearchForm query={query} />

      <Tabs
        defaultValue="posts"
        className="min-w-full flex flex-col items-center"
      >
        <TabsList className="w-full flex justify-between p-4 my-8">
          {tabs.map((item) => (
            <TabsTrigger value={item.name} key={item.name}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </section>
  );
};

export default SearchPage;
