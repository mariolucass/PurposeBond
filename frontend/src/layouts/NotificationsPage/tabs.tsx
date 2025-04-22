import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Heart, MessageSquare, Repeat2, UserPlus } from "lucide-react";

export const TabsNotificationsPage = () => {
  const tabs = [
    {
      name: "all",
      label: "All",
      icon: <Bell className="w-4 h-4 mr-2" />,
      component: <div />,
    },
    {
      name: "mentions",
      label: "Mentions",
      icon: <MessageSquare className="w-4 h-4 mr-2" />,
      component: <div />,
    },
    {
      name: "likes",
      label: "Likes",
      icon: <Heart className="w-4 h-4 mr-2" />,
      component: <div />,
    },
    {
      name: "reposts",
      label: "Reposts",
      icon: <Repeat2 className="w-4 h-4 mr-2" />,
      component: <div />,
    },
    {
      name: "follows",
      label: "Follows",
      icon: <UserPlus className="w-4 h-4 mr-2" />,
      component: <div />,
    },
  ];

  return (
    <Tabs defaultValue="all" className="min-w-full flex flex-col items-center">
      <TabsList className="w-full h-component bg-muted/50 flex justify-around items-center px-2 py-2 gap-2 border border-border shadow-sm rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            value={tab.name}
            key={tab.name}
            className="h-[44px] flex items-center"
          >
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <Separator />

      {tabs.map((tab) => (
        <TabsContent value={tab.name} key={tab.name} className="w-full">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
