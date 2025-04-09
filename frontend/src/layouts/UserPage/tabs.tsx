import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { TabLikes, TabMedia, TabMessage, TabPosts } from "./tabsComponents";

interface TabsUserPage {
  user?: {
    id: string;
    username: string;
  };
  isProfile?: boolean;
}

export const TabsUserPage = ({ user, isProfile }: TabsUserPage) => {
  const { authenticatedUser } = useAuthContext();
  const displayedUser = isProfile ? authenticatedUser : user;

  const tabs = [
    {
      name: "posts",
      component: <TabPosts user={displayedUser} />,
    },
    {
      name: "discussions",
      component: <TabLikes user={displayedUser} />,
    },
    {
      name: "likes",
      component: <TabLikes user={displayedUser} />,
    },
    {
      name: "media",
      component: <TabMedia user={displayedUser} />,
    },
  ];

  if (!isProfile) {
    tabs.push({
      name: "message",
      component: <TabMessage user={displayedUser} />,
    });
  }

  return (
    <Tabs
      defaultValue="posts"
      className="min-w-full flex flex-col items-center"
    >
      <TabsList className=" h-[80] w-full flex justify-around p-4 rounded-none">
        {tabs.map((item) => (
          <TabsTrigger value={item.name} key={item.name} className="h-full">
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
