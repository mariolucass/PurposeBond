import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthContext } from "@/contexts/auth.context";

import { TabLikes, TabMedia, TabMessage, TabPosts } from "./tabsComponents";

interface TabsUserPage {
  userId?: string;
  isProfile?: boolean;
}

export const TabsUserPage = ({ userId, isProfile }: TabsUserPage) => {
  const { authenticatedUser } = useAuthContext();
  const displayedUserId = isProfile ? authenticatedUser.id : userId;

  const tabs = [
    {
      name: "posts",
      component: <TabPosts userId={displayedUserId} />,
    },
    {
      name: "likes",
      component: <TabLikes userId={displayedUserId} />,
    },
    {
      name: "media",
      component: <TabMedia userId={displayedUserId} />,
    },
  ];

  if (!isProfile) {
    tabs.push({
      name: "message",
      component: <TabMessage userId={displayedUserId} />,
    });
  }

  return (
    <Tabs
      defaultValue="posts"
      className="min-w-full flex flex-col items-center"
    >
      <TabsList className="w-11/12 flex justify-between p-4 mb-4">
        {tabs.map((item) => (
          <TabsTrigger value={item.name} key={item.name}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      <Separator />

      {tabs.map((item) => (
        <TabsContent value={item.name} key={item.name} className="w-full">
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
