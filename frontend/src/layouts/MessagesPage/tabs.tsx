import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabChats } from "./tabsComponents/tabChats";
import { TabGroups } from "./tabsComponents/tabGroups";

export const TabsMessagePage = () => {
  const tabs = [
    {
      name: "chats",
      component: <TabChats />,
    },
    {
      name: "groups",
      component: <TabGroups />,
    },
  ];

  return (
    <Tabs defaultValue="chats" className="w-full">
      <TabsList className="w-full h-component bg-muted/50 flex justify-around items-center px-2 py-2 gap-2 border border-border shadow-sm rounded-none">
        {tabs.map((item) => (
          <TabsTrigger value={item.name} key={item.name} className="h-[44px]">
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      <Separator />

      {tabs.map((item) => (
        <TabsContent value={item.name} key={item.name} className="w-full m-0">
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
