import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TabsFeed = ({ feedState, setFeedState }: any) => {
  const tabs = [{ name: "forYou" }, { name: "following" }];

  return (
    <Tabs
      value={feedState.selectedTab}
      className="min-w-full flex flex-col items-center"
      onValueChange={(newValue) => {
        console.log(newValue);
        setFeedState((prev: any) => ({
          ...prev,
          selectedTab: newValue as "forYou" | "following",
        }));
      }}
    >
      <TabsList className="w-full h-component bg-muted flex justify-around items-center px-2 py-2 gap-2 border border-border shadow-sm rounded-none">
        {tabs.map((item) => (
          <TabsTrigger value={item.name} key={item.name} className="h-[44px]">
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
