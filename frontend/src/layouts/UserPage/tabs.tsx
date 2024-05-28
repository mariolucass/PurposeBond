import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabLikes } from "./tabLikes";
import { TabMedia } from "./tabMedia";
import { TabMessage } from "./tabMessage";
import { TabPosts } from "./tabPosts";

export const TabsUserPage = ({ userId }: { userId: string }) => {
  const tabs = [
    { name: "posts", component: <TabPosts userId={userId} /> },
    { name: "likes", component: <TabLikes userId={userId} /> },
    { name: "media", component: <TabMedia userId={userId} /> },
    { name: "message", component: <TabMessage userId={userId} /> },
  ];

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
