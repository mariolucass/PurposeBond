import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TabsFeed = () => {
  const tabs = [
    {
      name: "For You",
    },
    {
      name: "Following",
    },
  ];

  return (
    <Tabs
      defaultValue="posts"
      className="min-w-full flex flex-col items-center"
    >
      <TabsList className="w-11/12 flex justify-around">
        {tabs.map((item) => (
          <TabsTrigger value={item.name} key={item.name}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
