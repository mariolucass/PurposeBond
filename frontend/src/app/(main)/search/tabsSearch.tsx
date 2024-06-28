import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchContext } from "@/contexts/search.context";
import { SearchResults } from "@/layouts/Search/resultsSearch";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SearchType = "latest" | "popular" | "media" | "users";

export const TabsSearch = ({ query, type }: any) => {
  const { currentSearch, setCurrentSearch, currentType, setCurrentType } =
    useSearchContext();

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setCurrentSearch(query);
    setCurrentType(type);
    setInitialRender(false);
  }, []);

  useEffect(() => {
    if (initialRender) return;

    console.log("oi");
  }, [currentSearch, currentType]);

  const router = useRouter();
  const pathname = usePathname();

  const tabTypes: SearchType[] = ["popular", "latest", "users", "media"];

  const tabs = tabTypes.map((typeElem) => ({
    name: typeElem,
    component: currentSearch && <SearchResults />,
  }));

  const handleTypeChange = (name: string) => {
    const createSearchString = (name: string, value: string) => {
      const params = new URLSearchParams(currentSearch!.toString());
      params.set(name, value);
      return params.toString();
    };

    setCurrentType(name as SearchType);
    router.push(pathname + "?" + createSearchString("type", name));
  };

  return (
    <Tabs
      defaultValue={currentType ? currentType : "popular"}
      className="min-w-full flex flex-col items-center"
    >
      <TabsList className="w-full h-component flex justify-between p-4">
        {tabs.map((item) => (
          <TabsTrigger
            value={item.name}
            key={item.name}
            onClick={() => handleTypeChange(item.name)}
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
  );
};
