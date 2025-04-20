import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchResults } from "@/layouts/Search/resultsSearch";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

type SearchType = "latest" | "popular" | "media" | "users";

export const TabsSearch = ({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const tabTypes: SearchType[] = ["popular", "latest", "users", "media"];

  const tabs = tabTypes.map((typeElem) => ({
    name: typeElem,
    component: <SearchResults />,
  }));

  const handleTypeChange = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", name);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      defaultValue={"popular"}
      className="min-w-full flex flex-col items-center"
    >
      <TabsList className="w-full flex justify-between p-4 h-[80] rounded-none">
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
        <TabsContent value={item.name} key={item.name} className="w-full ">
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
